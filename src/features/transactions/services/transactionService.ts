import type { TransactionProps } from "../types/transaction.types";
const transactions:TransactionProps[]=[
                {
                    id:1,
                    amount:1000,
                    type:"credit",
                    accountNumber:"1234567890",
                    createdAt:new Date().toISOString(),
                    description:"Salary",
                    status:"success",
                    reviewed:false
                },
                {
                    id:2,
                    amount:500,
                    type:"debit",
                    accountNumber:"1234567890",
                    createdAt:new Date().toISOString(),
                    description:"Grocery",
                    status:"pending",
                    reviewed:false
                }
            ];

export const fetchTransactions=async ():Promise<TransactionProps[]>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(transactions);
        },1000);
    }); 
};

export const fetchTransactionById=async (id:string):Promise<TransactionProps | null>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const transactionData=transactions.find(item=>item.id.toString()===id);
            resolve(transactionData ?? null);
        },1000);
    }); 
};

export const markTransactionReviewed = async (_id:number):Promise<{success:boolean} | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
};

export const fetchTransactionPage = async (pageParam: number = 1): Promise<TransactionProps[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const pageTransactions: TransactionProps[] = Array.from({ length: 10 }).map((_, index) => ({
                id: (pageParam - 1) * 10 + index + 1,
                amount: Math.floor(Math.random() * 10000),
                type: index % 2 === 0 ? "credit" : "debit",
                accountNumber: "1234567890" + index,
                createdAt: new Date().toISOString(),
                description: "Transaction" + index,
                status: "success",
                reviewed: false,
            }));
            resolve(pageTransactions);
        }, 1000);
    });
};