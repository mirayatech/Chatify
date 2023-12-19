/* eslint-disable @typescript-eslint/ban-ts-comment */
import ClickAwayListener from "react-click-away-listener";

import {
  query,
  collection,
  orderBy,
  where,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
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
  StyledNavbar,
  PrimaryContainer,
  ProfileButton,
  ProfileButtonContainer,
  ProfileMenu,
  ProfilePicture,
  SecondaryContainer,
  ShowProfileButton,
  StyledSideBar,
  SignOutButton,
  ThemeButton,
  Wrapper,
  Text,
  SelectConversationButton,
} from "./Style";
import { useTheme } from "../../hooks/useTheme";
import { useUserStore } from "../../hooks";
import { Spinner } from "../Core";
import { Profile } from "./Profile/Profile";

export function Sidebar() {
  const { currentUser } = useUserStore();
  const [profile, setProfile] = useState(null);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isConversationModalOpen, setConversationModalOpen] = useState(false);
  const theme = useTheme();
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

  const handleProfileClick = () => {
    setProfileOpen(true);
    setIsSettingOpen(false);
  };

  const toggleTheme = async () => {
    if (currentUser?.uid) {
      const userRef = doc(firebaseFirestore, "users", currentUser.uid);
      try {
        await updateDoc(userRef, {
          chatMode: theme === "light" ? "dark" : "light",
        });
      } catch (error) {
        console.error("Error updating theme:", error);
      }
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      const userDocRef = doc(firebaseFirestore, "users", currentUser.uid);

      const unsubscribe = onSnapshot(
        userDocRef,
        (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setProfile(userData);
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
        }
      );

      return () => unsubscribe();
    }
  }, [currentUser?.uid]);

  return (
    <StyledSideBar theme={theme}>
      <StyledNavbar theme={theme}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "calc(20 / 16 * 1rem",
            fontWeight: 500,
            color: theme === "light" ? "#24292f" : "#fff",
          }}
        >
          Chatify
        </Link>

        <Wrapper theme={theme}>
          <PrimaryContainer theme={theme}>
            <ChatButton
              theme={theme}
              aria-label="New conversation"
              onClick={() => setConversationModalOpen(true)}
            >
              <LuPlus />
            </ChatButton>
          </PrimaryContainer>
          <SecondaryContainer theme={theme}>
            <ProfileButtonContainer>
              <ProfileButton
                onClick={() => {
                  setIsSettingOpen(!isSettingOpen);
                }}
              >
                <ProfilePicture src={profile?.profilePicture} alt="" />
              </ProfileButton>

              {isSettingOpen && (
                <ClickAwayListener onClickAway={() => setIsSettingOpen(false)}>
                  <ProfileMenu theme={theme}>
                    <ShowProfileButton
                      theme={theme}
                      onClick={handleProfileClick}
                    >
                      Profile
                    </ShowProfileButton>
                    <ThemeButton theme={theme} onClick={toggleTheme}>
                      {theme === "light" ? "Dark mode" : "Light mode"}
                    </ThemeButton>
                    <SignOutButton theme={theme} onClick={signOutUser}>
                      Sign out
                    </SignOutButton>
                  </ProfileMenu>
                </ClickAwayListener>
              )}
            </ProfileButtonContainer>
          </SecondaryContainer>
        </Wrapper>
      </StyledNavbar>

      {isProfileOpen && (
        <Profile theme={theme} setProfileOpen={setProfileOpen} />
      )}

      {isConversationModalOpen && (
        <CreateConversation
          theme={theme}
          setConversationModalOpen={setConversationModalOpen}
        />
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Container>
          <Text>Something went wrong</Text>
        </Container>
      ) : data?.empty ? (
        <Container>
          <Text>No conversation found</Text>
          <SelectConversationButton
            theme={theme}
            onClick={() => setConversationModalOpen(true)}
          >
            Create one
          </SelectConversationButton>
        </Container>
      ) : (
        <>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */}
          {data?.docs.map((_item: any) => (
            <div>Conversation</div>
          ))}
        </>
      )}
    </StyledSideBar>
  );
}
