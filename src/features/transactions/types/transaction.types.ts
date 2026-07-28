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