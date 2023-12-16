import AuthenticationForm from "../../components/AuthenticationForm/AuthenticationForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { firebaseAuth } from "../../firebase/firebaseConfig";

export default function SignIn() {
  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error("Failed to sign in");
      console.error(error);
    }
  };

  return (
    <AuthenticationForm
      text={"Sign In"}
      withText={true}
      extraInput={false}
      buttonText={"Sign In"}
      linkText={"Don't have an account? Sign up here."}
      onSubmit={handleSignIn}
      linkUrl={"/signup"}
    />
  );
}
