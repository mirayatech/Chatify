import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "../library";

type ThemeContextType = string | null;

const ThemeContext = createContext<ThemeContextType>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { currentUser } = useUserStore();
  const [theme, setTheme] = useState<ThemeContextType>("light");

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const db = getFirestore();
      const userDoc = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(userDoc, (doc) => {
        const userData = doc.data();
        if (userData && userData.chatMode) {
          setTheme(userData.chatMode);
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
