import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import usePermission from "../features/auth/hooks/usePermission";
import NotificationBadge from "../features/notification/components/NotificationBadge";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isAdmin } = usePermission();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    ...linkStyle,
    ...(isActive ? activeLinkStyle : {}),
  });

  return (
    <div style={containerStyle}>
      <aside style={sidebarStyle}>
        <div>
          <h2 style={logoStyle}>🏦 HDFC BANK</h2>
          <p style={welcomeStyle}>Welcome, {user?.name}</p>

          <nav style={navStyle}>
            <NavLink to="/dashboard" style={getLinkStyle}>
              📊 Dashboard
            </NavLink>

            {isAdmin && (
              <NavLink to="/analytics" style={getLinkStyle}>
                📈 Analytics
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/audit" style={getLinkStyle}>
                Audit
              </NavLink>
            )}

            <NavLink to="/account" style={getLinkStyle}>
              💳 Accounts
            </NavLink>

            <NavLink to="/transactions" style={getLinkStyle}>
              💸 Transactions
            </NavLink>

            <NavLink to="/profile" style={getLinkStyle}>
              👤 Profile
            </NavLink>
          </nav>
        </div>

        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      </aside>

      <div style={contentWrapperStyle}>
        <header style={headerStyle}>
          <h3 style={{ margin: 0 }}>Banking Dashboard</h3>

          <div style={headerRightStyle}>
            <NotificationBadge />
            <div style={userInfoStyle}>
              <strong>{user?.name}</strong>
              <small>{user?.email}</small>
            </div>
          </div>
        </header>

        <main style={mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  height: "100vh",
  background: "#f4f7fb",
};

const sidebarStyle: React.CSSProperties = {
  width: "250px",
  background: "#0B3D91",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "24px 18px",
};

const logoStyle: React.CSSProperties = {
  margin: 0,
  marginBottom: "12px",
  fontSize: "24px",
};

const welcomeStyle: React.CSSProperties = {
  marginBottom: "30px",
  color: "#d8e3ff",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const linkStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "white",
  fontWeight: 500,
  transition: "0.3s",
};

const activeLinkStyle: React.CSSProperties = {
  background: "white",
  color: "#0B3D91",
};

const logoutButtonStyle: React.CSSProperties = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#ef4444",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};

const contentWrapperStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const headerStyle: React.CSSProperties = {
  height: "70px",
  background: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 30px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const headerRightStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const userInfoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "right",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: "24px",
  overflowY: "auto",
};

export default DashboardLayout;