import type { NotificationProps } from "../types/notificationProps";
import api from "../../../services/api";

export const fetchNotification=async ():Promise<NotificationProps[]>=>{
    const response=await api.get<NotificationProps[]>("/notifications");
    return response.data;

}

export const fetchNotificationById=async (id: string):Promise<NotificationProps>=>{
    const response=await api.patch<NotificationProps>(`/notifications/${id}/read`);
    console.log("Data is current API CALL",response);
    return response.data;

}