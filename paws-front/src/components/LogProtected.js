import { Navigate } from "react-router-dom";
const LogProtected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default LogProtected;