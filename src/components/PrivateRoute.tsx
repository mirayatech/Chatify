import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../hooks";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useUserStore();

  if (!currentUser) return <Navigate to={{ pathname: "/signin" }} />;

  return <>{children}</>;
}
