import ClickAwayListener from "react-click-away-listener";

import { query, collection, orderBy, where } from "firebase/firestore";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
import { firebaseAuth, firebaseFirestore } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
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
  SelectConversationContainer,
} from "./Style";
import { useTheme } from "../../hooks/useTheme";
import { useUserStore } from "../../hooks";
import { Spinner } from "../Core";
import {
  ConversationInfoType,
  DEFAULT_AVATAR,
  IMAGE_PROXY,
} from "../../library";
import { CreateConversation, Profile, SelectConversation } from ".";

export function Sidebar() {
  const { currentUser } = useUserStore();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isConversationModalOpen, setConversationModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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

  return (
    <StyledSideBar theme={theme}>
      <StyledNavbar theme={theme}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "calc(24 / 16 * 1rem)",
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
                <ProfilePicture
                  src={IMAGE_PROXY(currentUser?.photoURL ?? DEFAULT_AVATAR)}
                  alt="profile picture"
                />
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

      {isProfileOpen && theme && (
        <Profile
          theme={theme}
          isOpen={isProfileOpen}
          setProfileOpen={setProfileOpen}
        />
      )}

      {isConversationModalOpen && theme && (
        <CreateConversation
          theme={theme}
          isOpen={isConversationModalOpen}
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
        <SelectConversationContainer>
          {data?.docs.map((item) => (
            <SelectConversation
              key={item.id}
              theme={theme}
              conversation={item.data() as ConversationInfoType}
              conversationId={item.id}
            />
          ))}
        </SelectConversationContainer>
      )}
    </StyledSideBar>
  );
}
