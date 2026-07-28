import type { NotificationProps } from "../types/notificationProps";

export const fetchNotification=async ():Promise<NotificationProps[]>=>{
    return new Promise((resolve)=>{
        resolve([
            {id:1,title:"Transaction Success",message:"5000 credited successfully",read:false,createdAt:"2025-08-01"},
                        {id:2,title:"Fraud Alert",message:"Suspicious login detected",read:false,createdAt:"2025-08-10"}

        ])
    })

}