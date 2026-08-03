import { lazy, Suspense } from "react";
import useAnalytics from "../hooks/useAnalytics";
import "../css/AnalyticsPage.css";

const RevenueChart = lazy(
  () => import("../components/RevenueChart")
);


const AnalyticsPage = () => {

  const { data, error, isLoading } = useAnalytics();



  if(isLoading){
    return (
      <div className="analytics-loading">
        <div className="loader"></div>
        <p>Loading analytics...</p>
      </div>
    )
  }



  if(error instanceof Error){
    return (
      <div className="analytics-error">

        <h2>
          Unable to load analytics
        </h2>

        <p>
          {error.message}
        </p>

      </div>
    )
  }



  const cards = [
    {
      title:"Total Transactions",
      value:data?.totalTransactions?.toLocaleString("en-US"),
      icon:"💳",
      color:"blue"
    },
    {
      title:"Total Revenue",
      value:`$${data?.totalRevenue?.toLocaleString("en-US")}`,
      icon:"💰",
      color:"green"
    },
    {
      title:"Failed Transactions",
      value:data?.failedTransactions,
      icon:"⚠️",
      color:"red"
    },
    {
      title:"Active Users",
      value:data?.activeUsers?.toLocaleString("en-US"),
      icon:"👥",
      color:"purple"
    }
  ];



  return (

    <div className="analytics-page">


      <div className="analytics-header">

        <div>
          <h1>
            Analytics Dashboard
          </h1>

          <p>
            Monitor banking activity and performance
          </p>
        </div>


      </div>





      <div className="analytics-cards">


        {
          cards.map((card)=>(
            <div
              key={card.title}
              className={`analytics-card ${card.color}`}
            >

              <div className="card-icon">
                {card.icon}
              </div>


              <div>

                <span>
                  {card.title}
                </span>

                <h2>
                  {card.value ?? 0}
                </h2>

              </div>


            </div>
          ))
        }


      </div>





      <div className="chart-card">

        <h2>
          Revenue Overview
        </h2>


        <Suspense
          fallback={
            <div className="chart-loading">
              Loading chart...
            </div>
          }
        >

          <RevenueChart/>

        </Suspense>


      </div>



    </div>

  );
};


export default AnalyticsPage;