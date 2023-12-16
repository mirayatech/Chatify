import AuthenticationForm from "../../components/AuthenticationForm/AuthenticationForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import {
  firebaseAuth,
  firebaseFirestore,
  firebaseStorage,
} from "../../firebase/firebaseConfig";

export default function SignUp() {
  const handleSignUp = async (
    email: string,
    password: string,
    fullName?: string,
    file?: File
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      let imageUrl = "/empty-avatar.png";
      if (file) {
        const fileRef = ref(firebaseStorage, `profilePictures/${user.uid}`);
        await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(fileRef);
      }

      await setDoc(doc(firebaseFirestore, "users", user.uid), {
        fullName: fullName || "",
        email: email,
        uid: user.uid,
        profilePicture: imageUrl,
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
      withText={false}
      extraInput={true}
      buttonText={"Sign Up"}
      onSubmit={handleSignUp}
      linkText={"Already have an account? Sign in here."}
      linkUrl={"/signin"}
    />
  );
}
