import AuthenticationForm from "../../components/AuthenticationForm/AuthenticationForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { firebaseAuth, firebaseFirestore } from "../../firebase/firebaseConfig";

export default function SignUp() {
  const handleSignUp = async (
    email: string,
    password: string,
    username?: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firebaseFirestore, "users", user.uid), {
        username: username || "",
        email: email,
        uid: user.uid,
        profilePicture: "/empty-avatar.png",
      });

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Failed to create account");
      console.error(error);
    }
  };

  return (
    <AuthenticationForm
      text={"Sign Up"}
      extraInput={true}
      buttonText={"Sign Up"}
      onSubmit={handleSignUp}
      linkText={"Already have an account? Sign in here."}
      linkUrl={"/signin"}
      verifyPassword={true}
    />
  );
}
