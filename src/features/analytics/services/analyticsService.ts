import type { AnalyticsSummary } from "../types/AnalyticsProps"
import api from "../../../services/api"

export const fetchAnalytics=async ():Promise<AnalyticsSummary>=>{
    const response=await api.get<AnalyticsSummary>("/analytics");
    return response.data;
}