import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContainer } from "./styles/ReusableStyles";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "./firebase/firebaseConfig";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./hooks/useTheme";
import { useUserStore } from "./hooks";
import { Spinner } from "./components/Core";
import { setDoc, doc } from "firebase/firestore";

const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Home = lazy(() => import("./pages/Home/Home"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

export default function App() {
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);
        setDoc(doc(firebaseFirestore, `users/${user.uid}`), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || user.providerData?.[0]?.phoneNumber,
        });
      } else setCurrentUser(null);
    });
  }, []);

  return (
    <ThemeProvider>
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
            <Suspense
              fallback={
                <AuthContainer>
                  <Spinner />
                </AuthContainer>
              }
            >
              <AuthContainer>
                <SignIn />
              </AuthContainer>
            </Suspense>
          }
        />

        <Route
          path="/:id"
          element={
            <Suspense
              fallback={
                <AuthContainer>
                  <Spinner />
                </AuthContainer>
              }
            >
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route path="/iii" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
