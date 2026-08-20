import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

interface ProtectedRouteProps {
  user: User | null;
  children: ReactNode;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
