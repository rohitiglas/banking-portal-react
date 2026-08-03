export type TransactionProps ={
    id:number;
    amount:number;
    type:"credit" | "debit";
    accountNumber:string;
    createdAt:string;
    description:string;
    status:"success" | "pending" | "failed";
    reviewed?:boolean
}

export interface TransactionResponse {
    data: TransactionProps[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
}