import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute= ({ children }: PublicRouteProps) => {
  const { isAuthenticated, accessToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, accessToken, navigate]);

  if (isAuthenticated && accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default PublicRoute;
