/* eslint-disable @typescript-eslint/ban-ts-comment */
import { query, collection, orderBy, where, getDocs } from "firebase/firestore";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
import { useUserStore } from "../../library";
import { firebaseAuth, firebaseFirestore } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { CreateConversation } from "./CreateConversation/CreateConversation";
import {
  ChatButton,
  Container,
  Navbar,
  PrimaryContainer,
  ProfileButton,
  ProfilePicture,
  SecondaryContainer,
  ShowProfileButton,
  SideBar,
  SignOutButton,
  Wrapper,
} from "./Style";

export function Sidebar() {
  const { currentUser } = useUserStore();
  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, loading } = useCollectionQuery(
    "conversations",
    query(
      collection(firebaseFirestore, "conversations"),
      orderBy("updatedAt", "desc"),
      where("users", "array-contains", currentUser?.uid)
    )
  );

  const signOutUser = async () => {
    try {
      await signOut(firebaseAuth);
      toast.success("User signed out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      const userDoc = query(
        collection(firebaseFirestore, "users"),
        where("uid", "==", currentUser.uid)
      );

      getDocs(userDoc)
        .then((querySnapshot) => {
          const userData = querySnapshot.docs[0]?.data();
          if (userData) {
            // @ts-ignore
            setProfile(userData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <SideBar>
      <Navbar>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "calc(20 / 16 * 1rem",
            fontWeight: 500,
            color: "#24292f",
          }}
        >
          Chatify
        </Link>

        <Wrapper>
          <PrimaryContainer>
            <ChatButton
              aria-label="New conversation"
              onClick={() => setIsModalOpen(true)}
            >
              <LuPlus />
            </ChatButton>
          </PrimaryContainer>
          <SecondaryContainer>
            <div>
              <ProfileButton
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                }}
              >
                {/* @ts-ignore */}
                <ProfilePicture src={profile?.profilePicture} alt="" />
              </ProfileButton>

              {isProfileOpen && (
                <div>
                  <ShowProfileButton onClick={() => setIsProfileOpen(true)}>
                    Profile
                  </ShowProfileButton>
                  <SignOutButton onClick={signOutUser}>sign out</SignOutButton>
                </div>
              )}
            </div>
          </SecondaryContainer>
        </Wrapper>
      </Navbar>

      {isModalOpen && <CreateConversation setIsModalOpen={setIsModalOpen} />}

      {loading ? (
        <Container>"Loading..."</Container>
      ) : error ? (
        <Container>
          <p>Something went wrong</p>
        </Container>
      ) : data?.empty ? (
        <Container>
          <p>No conversation found</p>
          <button onClick={() => setIsModalOpen(true)}>Create one</button>
        </Container>
      ) : (
        <>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */}
          {data?.docs.map((item: any) => (
            <div>Conversation</div>
          ))}
        </>
      )}
    </SideBar>
  );
}
