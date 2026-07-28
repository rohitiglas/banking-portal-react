import type { Column } from "../../shared/components/DataTable";
import type { TransactionProps } from "./types/transaction.types";


export const columns: Column<TransactionProps>[] = [
    {
        key: "id",
        title: "ID"
    },
    {
        key: "reviewed",
        title: "Reviewed",
        isClickable:true
    },
    {
        key: "amount",
        title: "Amount"
    },
    {
        key: "type",
        title: "Type"
    },
    {
        key: "accountNumber",
        title: "Account Number"
    },
    {
        key: "createdAt",
        title: "Date"
    },
    {
        key: "description",
        title: "Description"
    }
];

export const statusOptions = [
    { label: "All", value: "all" },
    { label: "Success", value: "success" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
];