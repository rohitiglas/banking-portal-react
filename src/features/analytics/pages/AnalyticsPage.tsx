import { lazy,Suspense } from "react";
import useAnalytics from "../hooks/useAnalytics";

const RevenueChart=lazy(()=> import("../components/RevenueChart"))




const AnalyticsPage = () => {
  const {data,error,isLoading}=useAnalytics();

  if(isLoading){
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  if(error instanceof Error){
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    )
  }
  

  return (
    <div className="analytics-page">
      <h1>Total Transaction:{data?.totalTransactions}</h1>
      <h1>Total Revenue:{data?.totalRevenue}</h1>
      <h1>Failed Transaction:{data?.failedTransactions}</h1>
      <h1>Active Users:{data?.activeUsers}</h1>
      <Suspense fallback={<p>Loading Chart...</p>}>
        <RevenueChart/>
      </Suspense>
    </div>
  );
}
export default AnalyticsPage;