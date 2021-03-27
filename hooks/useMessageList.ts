import { useMemo } from "react";
import { Message } from "../models/Message";
import { useFirebaseList } from "../modules/firebase";

export function useMessageList() {
  const { items, addItem } = useFirebaseList<Message>("/message", {
    limitToLast: 50,
  });
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => b.timestamp - a.timestamp);
  }, [items]);
  return { items: sortedItems, addItem };
}
