import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isAuthenticated, accessToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      navigate("/login");
    }
  }, [isAuthenticated, accessToken, navigate]);

  if (!isAuthenticated || !accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;
