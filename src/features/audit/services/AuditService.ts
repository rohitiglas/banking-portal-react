import type { AuditProps } from "../types/AuditProps";

export const fetchAudit=async():Promise<AuditProps[]>=>{
    return new Promise((resolve)=>{
        resolve([
            {
            id:1,
            action:"User Login",
            user:'Rohit',
            status:"success",
            createdAt:"2025-08-01 10:00",
            ipAddress:"192.168.1.1"
        },
        {
            id:2,
            action:"Fund Transfer",
            user:'Sanjana',
            status:"warning",
            createdAt:"2026-08-10 10:00",
            ipAddress:"192.168.1.2"
        }
    ]
    )
    })

}