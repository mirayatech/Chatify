import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContainer } from "./styles/ReusableStyles";
import { useUserStore } from "./library";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase/firebaseConfig";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home/Home";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));

export default function App() {
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
      if (user) {
        setCurrentUser(user);
      } else setCurrentUser(null);
    });
  }, [setCurrentUser]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <Suspense fallback={"loading..."}>
              <AuthContainer>
                <SignIn />
              </AuthContainer>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={"loading..."}>
              <AuthContainer>
                <SignUp />
              </AuthContainer>
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}
