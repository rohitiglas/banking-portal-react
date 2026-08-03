import { useTransaction } from "../hooks/useTransaction";
import TransactionSummary from "../components/TransactionSummary";
import TransactionFilters from "../components/TransactionFilters";
import TransactionTable from "../components/TransactionTable";
import TransactionLoading from "../components/TransactionLoading";
import TransactionError from "../components/TransactionError";

import "../css/TransactionPage.css";

const TransactionPage = () => {

    const {
        filterTransactions,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        navigate,
        prefetchTransaction,
        handleReviewClick,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        error,
        refetch
    } = useTransaction();

    if (isLoading)
        return <TransactionLoading />;

    if (error instanceof Error)
        return (
            <TransactionError
                message={error.message}
                retry={refetch}
            />
        );

    return (

        <div className="transaction-page">

            <div className="transaction-header">
                <div>
                    <h1>Transactions</h1>
                    <p>
                        Monitor account activity and payments
                    </p>
                </div>
            </div>

            <TransactionSummary
                transactions={filterTransactions}
            />

            <TransactionFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                setSearchTerm={setSearchTerm}
                setStatusFilter={setStatusFilter}
            />

            <TransactionTable
                transactions={filterTransactions}
                navigate={navigate}
                prefetchTransaction={prefetchTransaction}
                handleReviewClick={handleReviewClick}
            />

            <div id="load-more-trigger" />

            {isFetchingNextPage && (
                <div className="loading-text">
                    Loading more transactions...
                </div>
            )}

            {!hasNextPage && (
                <div className="end-message">
                    🎉 You've reached the end.
                </div>
            )}

        </div>

    );

};

export default TransactionPage;