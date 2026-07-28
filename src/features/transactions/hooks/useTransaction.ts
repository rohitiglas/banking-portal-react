import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactionById, fetchTransactionPage, markTransactionReviewed } from "../services/transactionService";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import type { TransactionProps } from "../types/transaction.types";

const ITEMS_PER_PAGE = 5;



export const useTransaction = () => {
    const [statusFilter, setStatusFilter] = useState<"all" | "success" | "pending" | "failed">("all");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const debounceSearch = useDebounce(searchTerm, 500);
    const queryClient=useQueryClient();
    const prefetchTransaction=async (id:number)=>{
        await queryClient.prefetchQuery({
            queryKey:["transaction",String(id)],
            queryFn:()=>fetchTransactionById(String(id))
        });
    };
    const { data, isLoading, error, refetch, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<TransactionProps[], Error, { pages: TransactionProps[][]; pageParams: number[] }, string[], number>({
        queryKey: ["transactions"],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchTransactionPage(pageParam ?? 1),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 10) return undefined;
            return allPages.length + 1;
        },
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                fetchNextPage();
            }
        });

        const loadMoreElement = document.getElementById("load-more-trigger");
        if (loadMoreElement) {
            observer.observe(loadMoreElement);
        }

        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage]);
    const navigate=useNavigate();

    const reviewedMutation=useMutation({
        mutationFn: markTransactionReviewed,
        onSuccess: (data) => {
    console.log("Review Response",data);
  },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: ["transactions"] });

            const previousTransactions = queryClient.getQueryData<TransactionProps[]>(["transactions"]);

            queryClient.setQueryData<TransactionProps[]>(["transactions"], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map((item) =>
                    item.id === id ? { ...item, reviewed: !item.reviewed } : item
                );
            });

            return { previousTransactions };
        },
        onError: (_err, _id, context) => {
            if (context?.previousTransactions) {
                queryClient.setQueryData(["transactions"], context.previousTransactions);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });

    const filterTransactions = useMemo(() => {
        const transactions = data?.pages.flatMap((page) => page) ?? [];

        return transactions.filter((transaction) => {
            const matchedStatus = statusFilter === "all" ? true : transaction.status === statusFilter;
            return transaction.description.toLowerCase().includes(debounceSearch.toLowerCase()) && matchedStatus;
        });
    }, [debounceSearch, data, statusFilter]);

    const handleReviewClick=(row:TransactionProps)=>{
        reviewedMutation.mutate(row.id);
    };

    const paginatedTransactions = filterTransactions?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return { data, isLoading, error, refetch, filterTransactions, paginatedTransactions, searchTerm, setSearchTerm, statusFilter, setStatusFilter, page, setPage, ITEMS_PER_PAGE, navigate, prefetchTransaction, handleReviewClick, isFetchingNextPage };

}