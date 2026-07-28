import type { AnalyticsSummary } from "../types/AnalyticsProps"

export const fetchAnalytics=async ():Promise<AnalyticsSummary>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                totalTransactions:15000,
                totalRevenue:200000,
                failedTransactions:120,
                activeUsers:2500

            })

        },1000)
    })
}