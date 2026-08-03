import {
    useInfiniteQuery,
    useQueryClient
} from "@tanstack/react-query";


import {
    fetchTransactionById,
    fetchTransactions
} from "../services/transactionService";



export const useTransactions = (
    search:string,
    status:string
)=>{


const queryClient =
useQueryClient();



const query =
useInfiniteQuery({

    queryKey:[
        "transactions",
        search,
        status
    ],


    initialPageParam:1,


    queryFn:({pageParam})=>
        fetchTransactions(
            pageParam,
            20,
            search,
            status
        ),



    getNextPageParam:(lastPage)=>{

        if(lastPage.hasNextPage)
        {
            return lastPage.page + 1;
        }

        return undefined;
    }

});



const prefetchTransaction =
async(id:number)=>{


await queryClient.prefetchQuery({

    queryKey:[
        "transaction",
        id
    ],


    queryFn:()=>fetchTransactionById(
        String(id)
    )

});

};



return {

    ...query,

    prefetchTransaction

};

};