import { useTransaction } from "../hooks/useTransaction";
import InputField from "../../../shared/components/InputField";
import Dropdown from "../../../shared/components/Dropdown";
import DataTable from "../../../shared/components/DataTable";
import { columns, statusOptions } from "../constants";
import TableSkeleton from "../../../shared/components/skeletons/TableSkeleton";

const TransactionPage = () => {

  const { isLoading, error, filterTransactions,paginatedTransactions, searchTerm, setSearchTerm, statusFilter, setStatusFilter, page, setPage,ITEMS_PER_PAGE,refetch,navigate,prefetchTransaction,handleReviewClick,isFetchingNextPage } = useTransaction();


  if (isLoading) {
    return <TableSkeleton />;
  }
  if (error instanceof Error) {
    return (
      <div>
        <h2>
          Failed to load transactions

        </h2>
      <p>
        {error.message}
      </p>
      <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  


  return (
    <div className="transaction-page">
      <h2>Transactions</h2>
      <InputField type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <Dropdown
        label="Status"
        options={statusOptions}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as "all" | "success" | "failed")}
      />
      <DataTable columns={columns} data={paginatedTransactions} message="No transactions found" rowClickHandler={(row) => navigate(`/transactions/${row.id}`)} mouseEnter={(row)=>prefetchTransaction(row?.id)} onCellClick={(row)=>handleReviewClick(row)} />
      <div id="load-more-trigger" style={{ height: "1px" }} />
      {isFetchingNextPage && <p>Loading more...</p>}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <span>Page {page}</span>
      <button onClick={() => setPage((prev) => prev + 1)}
        disabled={page * ITEMS_PER_PAGE >= filterTransactions?.length!}
      >Next</button>

    </div>
  );
}

export default TransactionPage;