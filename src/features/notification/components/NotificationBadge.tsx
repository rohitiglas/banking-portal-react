import { useEffect, useRef, useState } from "react";
import useNotification from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";

const NotificationBadge = () => {
 const {
  data,
  markReadMutation
} = useNotification();
  const navigate=useNavigate();

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = data?.filter((n) => !n.read).length ?? 0;

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const openNotification=(itemId: string)=>{
    markReadMutation.mutate(itemId);
    navigate(`/notifications/${itemId}`);
    setOpen(false);
  }

  return (
    <div ref={panelRef} style={containerStyle}>
      <button
        style={bellButtonStyle}
        onClick={() => setOpen((prev) => !prev)}
      >
        🔔
      </button>

      {unreadCount > 0 && (
        <span style={badgeStyle}>
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {open && (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <strong>Notifications</strong>
          </div>

          {data?.length ? (
            data.map((item) => (
              <div
                key={item.id}
                style={{
                  ...notificationStyle,
                  background: item.read ? "#fff" : "#eef5ff",
                }}
                onClick={() => openNotification(item.id)}
              >
                <div style={titleStyle}>
                  {item.title}
                </div>

                <div style={messageStyle}>
                  {item.message}
                </div>

                <div style={timeStyle}>
                  {item.createdAt}
                </div>
              </div>
            ))
          ) : (
            <div style={emptyStyle}>
              No notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default NotificationBadge;

const containerStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
};

const bellButtonStyle: React.CSSProperties = {
  fontSize: "24px",
  background: "none",
  border: "none",
  cursor: "pointer",
  position: "relative",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "-5px",
  right: "-5px",
  backgroundColor: "red",
  color: "white",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "12px",
};

const panelStyle: React.CSSProperties = {
  position: "absolute",
  top: "30px",
  right: "0",
  width: "300px",
  maxHeight: "400px",
  overflowY: "auto",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  zIndex: 1000,
};

const headerStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const notificationStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const titleStyle: React.CSSProperties = {
  fontWeight: "bold",
};

const messageStyle: React.CSSProperties = {
  marginTop: "5px",
};

const timeStyle: React.CSSProperties = {
  marginTop: "5px",
  fontSize: "12px",
  color: "#888",
};

const emptyStyle: React.CSSProperties = {
  padding: "10px",
  textAlign: "center",
  color: "#888",
};