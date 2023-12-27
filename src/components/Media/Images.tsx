import { collection, query, where, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { firebaseFirestore } from "../../firebase/firebaseConfig";
import { useCollectionQuery } from "../../hooks";
import { Grid, Image } from "./Style";
import { Spinner } from "../Core";
import { Info } from "../Chat/ChatViewGroup/Style";

export function ImageItem() {
  const { id: conversationId } = useParams();
  const { data, loading, error } = useCollectionQuery(
    `images-${conversationId}`,
    query(
      collection(
        firebaseFirestore,
        "conversations",
        conversationId as string,
        "messages"
      ),
      where("type", "==", "image"),
      orderBy("createdAt", "desc")
    )
  );

  if (loading || error) return <Spinner />;

  if (data?.empty) return <Info>No image found</Info>;

  return (
    <Grid>
      {data?.docs.map((image) => (
        <Image key={image.id} src={image.data().content} />
      ))}
    </Grid>
  );
}
