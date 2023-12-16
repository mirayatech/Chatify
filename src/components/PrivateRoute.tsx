import { ReactNode } from "react";
import { useUserStore } from "../library";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useUserStore();

  if (!currentUser) return <Navigate to={{ pathname: "/signin" }} />;

  return <>{children}</>;
}
