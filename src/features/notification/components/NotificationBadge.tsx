import { useState } from "react";
import useNotification from "../hooks/useNotification";

const NotificationBadge = () => {
     const [open,setOpen]=useState(false);
  const { data } = useNotification();

  const unReadCount =
    data?.filter((item) => !item.read).length ?? 0;

  return (
    <div style={containerStyle}>
      <button onClick={()=>setOpen(!open)} style={bellStyle}>🔔</button>
      {open && (
        <div>
            {data?.map((notification)=>(
                <div key={notification?.id}>
                    <h3>{notification.title}</h3>
                    <h4>{notification.message}</h4>

                </div>
            ))}
        </div>
      )}

      {unReadCount > 0 && (
        <span style={badgeStyle}>
          {unReadCount > 99 ? "99+" : unReadCount}
        </span>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const bellStyle: React.CSSProperties = {
  fontSize: "28px",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "-6px",
  right: "-8px",
  minWidth: "20px",
  height: "20px",
  padding: "0 6px",
  borderRadius: "999px",
  backgroundColor: "#ef4444",
  color: "#fff",
  fontSize: "12px",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};

export default NotificationBadge;