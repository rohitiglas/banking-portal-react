import DataTable from "../../../shared/components/DataTable";
import { columns } from "../constants";
import type { TransactionProps } from "../types/transaction.types";

type Props = {
    transactions: TransactionProps[];
    navigate: (url: string) => void;
    prefetchTransaction: (id: number) => void;
    handleReviewClick: (row: TransactionProps) => void;
};

const TransactionTable = ({
    transactions,
    navigate,
    prefetchTransaction,
    handleReviewClick
}: Props) => {

    return (

        <div className="table-container">

            <DataTable
                columns={columns}
                data={transactions}
                message="No transactions found"
                rowClickHandler={(row) =>
                    navigate(`/transactions/${row.id}`)
                }
                mouseEnter={(row) =>
                    prefetchTransaction(row.id)
                }
                onCellClick={(row) =>
                    handleReviewClick(row)
                }
            />

        </div>

    );

};

export default TransactionTable;