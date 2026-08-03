import type { TransactionProps, TransactionResponse } from "../types/transaction.types";
import api from "../../../services/api";


export const fetchTransactions = async (
    page = 1,
    limit = 20,
    search = "",
    status = "all"
): Promise<TransactionResponse> => {

    const response = await api.get<TransactionResponse>(
        "/transactions",
        {
            params: {
                page,
                limit,
                search,
                status
            }
        }
    );

    return response.data;
};

export const fetchTransactionById=async (id:string):Promise<TransactionProps | null>=>{
    console.log("Fetching transaction by ID:", id);
    const response = await api.get<TransactionProps>(`/transactions/${id}`);
    return response.data;
};

export const markTransactionReviewed = async (_id:number):Promise<{success:boolean} | null> => {
    console.log("Marking transaction as reviewed with ID:", _id);
    const response = await api.patch<{success:boolean}>(`/transactions/${_id}/review`);
    return response.data;
};

export const fetchTransactionPage = async (pageParam: number = 1): Promise<TransactionProps[]> => {
    const response = await fetchTransactions();
    const startIndex = (pageParam - 1) * 10;
    const endIndex = startIndex + 10;
    console.log('Response from fetchTransactionPage:', response);
    return response.data.slice(startIndex, endIndex);
};