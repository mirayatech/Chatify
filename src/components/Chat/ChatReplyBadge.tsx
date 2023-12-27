import { doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useDocumentQuery } from "../../hooks";
import { firebaseFirestore } from "../../firebase/firebaseConfig";
type ReplyBadgeProps = {
  messageId: string;
};
export function ChatReplyBadge({ messageId }: ReplyBadgeProps) {
  const { id: conversationId } = useParams();

  const { data, loading, error } = useDocumentQuery(
    `message-${messageId}`,
    doc(
      firebaseFirestore,
      "conversations",
      conversationId as string,
      "messages",
      messageId
    )
  );

  if (loading || error) return <div>waiting</div>;

  return (
    <>
      <div
        onClick={() => {
          const element = document.querySelector(`#message-${messageId}`);
          if (element) element.scrollIntoView({ behavior: "smooth" });
          toast.error(
            "Cannot find your message. Try to scroll up to load more."
          );
        }}
      >
        {data?.data()?.type === "text" ? (
          <p>{data?.data()?.content}</p>
        ) : data?.data()?.type === "image" ? (
          "An image"
        ) : data?.data()?.type === "file" ? (
          "A file"
        ) : (
          "Message has been removed"
        )}
      </div>
    </>
  );
}
