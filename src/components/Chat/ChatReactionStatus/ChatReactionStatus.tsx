import { useState } from "react";
import { IMAGE_PROXY, MessageItemType, REACTIONS_UI } from "../../../library";
import { useTheme, useUsersInfo } from "../../../hooks";
import { Modal, Spinner } from "../../Core";
import {
  ReactionStatus,
  User,
  Name,
  Image,
  Wrapper,
  ReactionImage,
} from "./Style";
import "./style.css";

type ReactionStatusProps = {
  position: "left" | "right" | "left-tab";
  message: MessageItemType;
};

export function ChatReactionStatus({ message, position }: ReactionStatusProps) {
  const {
    data: usersInfo,
    loading,
    error,
  } = useUsersInfo(Object.keys(message.reactions || {}));

  const [isReactionStatusOpened, setIsReactionStatusOpened] = useState(false);

  const { theme } = useTheme();

  return (
    <>
      <ReactionStatus
        theme={theme}
        onClick={() => setIsReactionStatusOpened(true)}
        className={
          position === "right"
            ? "status__right"
            : position === "left-tab"
            ? "status__left-seventy"
            : "status__left-twenty"
        }
      >
        {Object.entries(
          Object.entries(message.reactions).reduce((acc, [, value]) => {
            if (value) acc[value] = (acc[value] || 0) + 1;
            return acc;
          }, {} as { [key: number]: number })
        )
          .sort(([, value1], [, value2]) => value2 - value1)
          .slice(0, 3)
          .map(([key]) => (
            <img
              key={key}
              src={Object.entries(REACTIONS_UI)[Number(key) - 1][1].icon}
              alt=""
            />
          ))}
        <span>
          {
            Object.entries(message.reactions).filter(([, value]) => value)
              .length
          }
        </span>
      </ReactionStatus>

      {isReactionStatusOpened && theme && (
        <Modal
          onClose={() => setIsReactionStatusOpened(false)}
          theme={theme}
          isOpen={isReactionStatusOpened}
          title="Reactions"
        >
          {loading || error ? (
            <Spinner />
          ) : (
            <>
              {Object.entries(message.reactions)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <Wrapper key={key}>
                    <User>
                      <Image
                        src={IMAGE_PROXY(
                          usersInfo?.find((user) => user.id === key)?.data()
                            ?.photoURL
                        )}
                        alt=""
                      />
                      <Name>
                        {
                          usersInfo?.find((user) => user.id === key)?.data()
                            ?.displayName
                        }
                      </Name>
                    </User>

                    <ReactionImage
                      src={Object.values(REACTIONS_UI)[value - 1].icon}
                      alt="reaction"
                    />
                  </Wrapper>
                ))}
            </>
          )}
        </Modal>
      )}
    </>
  );
}
