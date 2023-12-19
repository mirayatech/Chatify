import { useEffect, useState, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  firebaseFirestore,
  firebaseStorage,
} from "../../../firebase/firebaseConfig";
import { FiX, FiRotateCcw } from "react-icons/fi";

import { useUserStore } from "../../../hooks";
import {
  Thick,
  CloseButton,
  Image,
  Text,
  ModalHeader,
  ModalBackdrop,
  ModalContainer,
  Container,
  Wrapper,
  ActionButton,
  ChangePictureButton,
  UploadPictureButton,
} from "./Style";

type ProfileProps = {
  theme: string;
  setProfileOpen: (value: boolean) => void;
};

export function Profile({ theme, setProfileOpen }: ProfileProps) {
  const currentUser = useUserStore((state) => state.currentUser);
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  useEffect(() => {
    if (currentUser?.uid) {
      const fetchUserData = async () => {
        const userRef = doc(firebaseFirestore, "users", currentUser.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // Handle the case where the document does not exist
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [currentUser?.uid]);

  const uploadImage = async () => {
    if (!selectedFile || !currentUser?.uid) return;

    const storageRef = ref(
      firebaseStorage,
      `profile_pictures/${currentUser.uid}`
    );
    const file = await fetch(selectedFile).then((r) => r.blob());

    uploadBytes(storageRef, file)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        const userRef = doc(firebaseFirestore, "users", currentUser.uid);
        await updateDoc(userRef, {
          profilePicture: downloadURL,
        });

        setUserData({ ...userData, profilePicture: downloadURL });
        setSelectedFile(null);
        setProfileOpen(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const addImageToPost = (event) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target?.result);
      };
    }
  };

  const handleClose = () => {
    setProfileOpen(false);
  };

  return (
    <ModalBackdrop>
      <ModalContainer theme={theme}>
        <ModalHeader theme={theme}>Your Profile</ModalHeader>
        <Container>
          {selectedFile ? (
            <ChangePictureButton
              aria-label="Change your profile picture"
              onClick={() => setSelectedFile(null)}
            >
              <FiX />
            </ChangePictureButton>
          ) : (
            <UploadPictureButton
              role="input"
              aria-label="Select your profile picture"
              onClick={() => filePickerRef.current.click()}
            >
              <FiRotateCcw />

              <input
                type="file"
                name="file"
                id="fileupload"
                ref={filePickerRef}
                accept="image/jpeg, image/png"
                aria-label="Choose File"
                onChange={addImageToPost}
                hidden
              />
            </UploadPictureButton>
          )}

          {selectedFile ? (
            <Image src={selectedFile} />
          ) : (
            <Image src={userData?.profilePicture} />
          )}
        </Container>
        <Wrapper>
          <Text theme={theme}>
            <Thick>ID:</Thick> {currentUser?.uid}
          </Text>
          <Text theme={theme}>
            <Thick>username</Thick> {userData?.username}
          </Text>
          <Text theme={theme}>
            <Thick>Email:</Thick> {userData?.email || currentUser?.email}
          </Text>
        </Wrapper>
        <CloseButton onClick={handleClose} theme={theme}>
          <FiX />
        </CloseButton>
        <ActionButton
          disabled={!selectedFile}
          onClick={uploadImage}
          theme={theme}
        >
          Save
        </ActionButton>
      </ModalContainer>
    </ModalBackdrop>
  );
}
