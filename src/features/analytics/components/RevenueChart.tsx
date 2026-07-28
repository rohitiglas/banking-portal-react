import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts"

const chartData=[
  {
    month:"Jan",
    revenue:4000,
  },
  {
    month:"Feb",
    revenue:7000,
  },
  {
    month:"Mar",
    revenue:5000,
  },
  {
    month:"Apr",
    revenue:9000,
  },
  {
    month:"May",
    revenue:12000,
  },
]


const RevenueChart=()=>{
    return (
        <div style={{marginTop:"20px",background:'white',padding:"20px",borderRadius:"12px"}}>
            <h3>Monthly Revenue</h3>
           <div style={{width:'100%',height:'300px'}}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray={"3 3"}/>
                    <XAxis dataKey={"month"}/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>

           </div>
        </div>
    )
}
export default RevenueChart;