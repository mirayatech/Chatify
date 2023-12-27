import { query, collection, where, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useCollectionQuery } from "../../hooks";
import { formatFileSize } from "../../library";
import { FileIcon } from "./FileIcon";
import { FileWrapper, FileName, FileSize } from "./Style";
import { IoMdDownload } from "react-icons/io";
import { Spinner } from "../Core";
import { firebaseFirestore } from "../../firebase/firebaseConfig";
import { Info } from "../Chat/ChatViewGroup/Style";

type FilesProps = {
  theme: string;
};

export function Files({ theme }: FilesProps) {
  const { id: conversationId } = useParams();

  const { data, loading, error } = useCollectionQuery(
    `files-${conversationId}`,
    query(
      collection(
        firebaseFirestore,
        "conversations",
        conversationId as string,
        "messages"
      ),
      where("type", "==", "file"),
      orderBy("createdAt", "desc")
    )
  );

  if (loading || error) return <Spinner />;

  if (data?.empty) return <Info>No file found</Info>;

  return (
    <div>
      {data?.docs.map((file) => (
        <FileWrapper
          key={file.id}
          theme={theme}
          href={file.data().content}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileIcon extension={file.data().file.name.split(".").slice(-1)[0]} />
          <div>
            <FileName>{file.data()?.file?.name}</FileName>
            <FileSize>{formatFileSize(file.data()?.file?.size)}</FileSize>
          </div>

          <IoMdDownload />
        </FileWrapper>
      ))}
    </div>
  );
}
