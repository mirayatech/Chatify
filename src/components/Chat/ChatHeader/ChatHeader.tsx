import { Skeleton } from "@mui/material";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { MdGroups, MdInfo } from "react-icons/md";

import { useTheme, useUserStore, useUsersInfo } from "../../../hooks";
import { ConversationInfoType, IMAGE_PROXY } from "../../../library";

import { ViewMedia } from "../../Media/ViewMedia";
import {
  Header,
  Wrapper,
  SingleImage,
  Relative,
  ImagePrimary,
  ImageSecondary,
  Name,
  GroupButton,
  SettingButton,
  HomeLink,
} from "./Style";
import { ChatViewGroup } from "../ChatViewGroup/ChatViewGroup";
import { ChatConversationSettings } from "..";

type ChatHeaderProps = {
  conversation: ConversationInfoType;
};
export function ChatHeader({ conversation }: ChatHeaderProps) {
  const { data: users, loading } = useUsersInfo(conversation.users);
  const { currentUser } = useUserStore();
  const { theme } = useTheme();
  const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  const [isConversationSettingsOpen, setIsConversationSettingsOpen] =
    useState(false);

  const [isGroupMembersOpen, setIsGroupMembersOpen] = useState(false);
  const [isViewMediaOpen, setIsViewMediaOpen] = useState(false);

  return (
    <>
      <Header theme={theme}>
        <Wrapper>
          <HomeLink
            theme={theme}
            className="mobile__link"
            to="/"
            aria-label="Home"
          >
            <FaChevronLeft />
          </HomeLink>

          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <>
              {conversation.users.length === 2 ? (
                <SingleImage
                  src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
                  alt=""
                />
              ) : (
                <>
                  {conversation?.group?.groupImage ? (
                    <SingleImage src={conversation.group.groupImage} alt="" />
                  ) : (
                    <Relative>
                      <ImagePrimary
                        theme={theme}
                        src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
                        alt=""
                      />
                      <ImageSecondary
                        src={IMAGE_PROXY(filtered?.[1]?.data()?.photoURL)}
                        alt=""
                      />
                    </Relative>
                  )}
                </>
              )}
            </>
          )}

          {loading ? (
            <Skeleton
              width={100}
              height={15}
              variant="rectangular"
              sx={{ ml: "10px" }}
            />
          ) : (
            <Name theme={theme}>
              {conversation.users.length > 2 && conversation?.group?.groupName
                ? conversation.group.groupName
                : filtered
                    ?.map((user) => user.data()?.displayName)
                    .slice(0, 3)
                    .join(", ")}
            </Name>
          )}
        </Wrapper>

        {!loading && (
          <Wrapper>
            {conversation.users.length > 2 && (
              <GroupButton
                theme={theme}
                onClick={() => setIsGroupMembersOpen(true)}
              >
                <MdGroups />
              </GroupButton>
            )}

            <SettingButton
              theme={theme}
              onClick={() => setIsConversationSettingsOpen(true)}
            >
              <MdInfo />
            </SettingButton>
          </Wrapper>
        )}
      </Header>

      {isConversationSettingsOpen && theme && (
        <ChatConversationSettings
          theme={theme}
          conversation={conversation}
          setMediaViewOpen={setIsViewMediaOpen}
          isOpen={isConversationSettingsOpen}
          setIsOpen={setIsConversationSettingsOpen}
        />
      )}

      {isGroupMembersOpen && theme && (
        <ChatViewGroup
          theme={theme}
          conversation={conversation}
          isOpen={isGroupMembersOpen}
          setIsOpen={setIsGroupMembersOpen}
        />
      )}

      {isViewMediaOpen && theme && (
        <ViewMedia
          theme={theme}
          setIsOpen={setIsViewMediaOpen}
          isOpen={isViewMediaOpen}
        />
      )}
    </>
  );
}
