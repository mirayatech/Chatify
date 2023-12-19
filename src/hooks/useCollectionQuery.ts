import type {
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
} from "firebase/firestore";

import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const cache: { [key: string]: QuerySnapshot<DocumentData> | null } = {};

export const useCollectionQuery: (
  key: string,
  collection: CollectionReference | Query<DocumentData>
) => {
  loading: boolean;
  error: boolean;
  data: QuerySnapshot<DocumentData> | null;
} = (key, collection) => {
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(
    cache[key] || null
  );

  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
        setError(false);
        cache[key] = snapshot;
      },
      (error) => {
        console.error(error);
        setData(null);
        setLoading(false);
        setError(true);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [key]);

  return { loading, error, data };
};
