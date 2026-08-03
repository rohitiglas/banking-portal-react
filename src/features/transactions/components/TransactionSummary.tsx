import type { TransactionProps } from "../types/transaction.types";

type Props = {
    transactions: TransactionProps[];
};

const TransactionSummary = ({ transactions }: Props) => {

    const total = transactions.length;

    const credit = transactions
        .filter(t => t.type === "credit")
        .reduce((sum, t) => sum + t.amount, 0);

    const debit = transactions
        .filter(t => t.type === "debit")
        .reduce((sum, t) => sum + t.amount, 0);

    const pending = transactions.filter(
        t => t.status === "pending"
    ).length;

    return (

        <div className="transaction-summary">

            <div className="summary-card">
                <span>Total Transactions</span>
                <strong>{total}</strong>
            </div>

            <div className="summary-card credit">
                <span>Total Credit</span>
                <strong>${credit.toLocaleString()}</strong>
            </div>

            <div className="summary-card debit">
                <span>Total Debit</span>
                <strong>${debit.toLocaleString()}</strong>
            </div>

            <div className="summary-card pending">
                <span>Pending</span>
                <strong>{pending}</strong>
            </div>

        </div>

    );

};

export default TransactionSummary;