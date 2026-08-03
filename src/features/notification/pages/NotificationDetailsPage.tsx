import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TableSkeleton from "../../../shared/components/skeletons/TableSkeleton";
import { fetchNotificationById } from "../services/NotificationService";

const NotificationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notification", id],
    queryFn: () => fetchNotificationById(id!),
  });

  console.log("Data is current",data);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error instanceof Error) {
    return <div>
        <h2>
            Failed to load notification details
        </h2>
       <button onClick={() => refetch()}>Retry</button>
        </div>;
  }

  if (!data) {
    return <div>No notification found</div>;
  }

  return (
    <div className="transaction-details-page">
      <h1>Notification Details</h1>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Title:</strong> {data.title}</p>
      <p><strong>Message:</strong> {data.message}</p>
      <p><strong>Date:</strong> {new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}
export default NotificationDetailsPage;