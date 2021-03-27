import * as firebase from "firebase";
import { useCallback, useEffect, useState } from "react";

interface FirebaseListOptions {
  limitToLast?: number;
}

export function useFirebaseList<
  T extends { id: string; pending?: boolean; [key: string]: any }
>(path: string, { limitToLast }: FirebaseListOptions = {}) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    firebase
      .database()
      .ref(path)
      .limitToLast(limitToLast ?? 10)
      .on("value", (snapshot) => {
        const newItems = Object.entries(snapshot.val()).map(
          ([key, value]) =>
            ({
              id: key,
              ...(value as object),
            } as T)
        );
        setItems(newItems);
      });
  }, []);

  const addItem = useCallback(
    (item: Omit<T, "id">) => {
      setItems([
        ...items,
        {
          id: String(Math.random()),
          pending: true,
          ...item,
        } as any,
      ]);
      firebase.database().ref(path).push(item);
    },
    [items]
  );

  return {
    items,
    addItem,
  };
}
