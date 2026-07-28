import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchTransactionById } from "../services/transactionService";
import TableSkeleton from "../../../shared/components/skeletons/TableSkeleton";

const TransactionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id!),
  });

  console.log("Data is current",data);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error instanceof Error) {
    return <div>
        <h2>
            Failed to load transaction details
        </h2>
       <button onClick={() => refetch()}>Retry</button>
        </div>;
  }

  if (!data) {
    return <div>No transaction found</div>;
  }

  return (
    <div className="transaction-details-page">
      <h1>Transaction Details</h1>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Amount:</strong> {data.amount}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Date:</strong> {new Date(data.createdAt).toLocaleString()}</p>
      <p><strong>Description:</strong> {data.description}</p>
    </div>
  );
}
export default TransactionDetailsPage;