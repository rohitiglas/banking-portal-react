import useAudit from "../hooks/useAudit";

const AuditPage = () => {
  const { data, isLoading, error } = useAudit();

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <h2>Loading Audit Logs...</h2>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div style={errorStyle}>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Audit Logs</h1>

      <div style={gridStyle}>
        {data?.map((audit) => (
          <div key={audit.id} style={cardStyle}>
            <div style={headerStyle}>
              <span style={actionBadge}>{audit.action}</span>
              <span
                style={{
                  ...statusBadge,
                  backgroundColor:
                    audit.status === "SUCCESS" ? "#16a34a" : "#dc2626",
                }}
              >
                {audit.status}
              </span>
            </div>

            <div style={rowStyle}>
              <strong>User</strong>
              <span>{audit.user}</span>
            </div>

            <div style={rowStyle}>
              <strong>IP Address</strong>
              <span>{audit.ipAddress}</span>
            </div>

            <div style={rowStyle}>
              <strong>Created</strong>
              <span>{new Date(audit.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  padding: "24px",
  background: "#f4f7fb",
  minHeight: "100%",
};

const titleStyle: React.CSSProperties = {
  marginBottom: "24px",
  color: "#1f2937",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  transition: "0.2s ease",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const actionBadge: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: 600,
  fontSize: "14px",
};

const statusBadge: React.CSSProperties = {
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: 600,
  fontSize: "13px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
  fontSize: "15px",
};

const loadingStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
};

const errorStyle: React.CSSProperties = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "20px",
  borderRadius: "10px",
};

export default AuditPage;