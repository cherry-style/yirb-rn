import * as React from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { Player } from "../components/Player";
import { Screen } from "../components/Screen";
import { View } from "../components/Themed";
import { useMessageList } from "../hooks/useMessageList";
import { useNickname } from "../hooks/useNickname";
import { FIREBASE_SERVER_TIMESTAMP } from "../modules/firebase";

export function LiveScreen() {
  const { items, addItem } = useMessageList();
  const [nickname] = useNickname();

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
    <Screen title="생방송">
      <View style={styles.container}>
        <Player />
        <GiftedChat<IMessage>
          renderAvatarOnTop
          renderUsernameOnMessage
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
            _id: nickname,
            name: nickname,
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
