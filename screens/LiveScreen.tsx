import * as React from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { Player } from "../components/Player";
import { View } from "../components/Themed";
import { useMessageList } from "../hooks/useMessageList";
import { FIREBASE_SERVER_TIMESTAMP } from "../modules/firebase";

export function LiveScreen() {
  const { items, addItem } = useMessageList();

  const onSend = useCallback((messages: IMessage[]) => {
    messages.forEach((message) => {
      addItem({
        nickname: String(message.user._id),
        text: message.text,
        timestamp: FIREBASE_SERVER_TIMESTAMP,
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Player />
      <GiftedChat<IMessage>
        messages={items.map((message) => ({
          _id: message.id,
          user: {
            _id: message.nickname,
            name: message.nickname,
          },
          text: message.text,
          createdAt: new Date(message.timestamp),
        }))}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: "처리",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
