import { Navigate, Outlet, useLocation } from "react-router-dom";
import { adminAuth } from "@/utils/adminAuth";

const RequireAdmin = () => {
  const location = useLocation();
  if (!adminAuth.isAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};

export default RequireAdmin;
