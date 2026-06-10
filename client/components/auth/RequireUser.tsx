import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userAuth } from "@/utils/userAuth";

const RequireUser = () => {
  const location = useLocation();
  if (!userAuth.isAuthed()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
};

export default RequireUser;
