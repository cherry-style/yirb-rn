import { Button, Input, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useNickname } from "../hooks/useNickname";

export function SettingsScreen() {
  const [nickname, setNickname] = useNickname();
  const [nicknameInput, setNicknameInput] = useState(nickname);
  return (
    <View style={styles.container}>
      <Text style={styles.heading} category="h4">
        닉네임
      </Text>
      <Layout style={styles.rowContainer} level="1">
        <Input
          size="large"
          style={styles.input}
          placeholder="Place your Text"
          value={nicknameInput}
          onChangeText={setNicknameInput}
        />
        <Button
          style={styles.button}
          size="medium"
          onPress={() => setNickname(nicknameInput)}
          disabled={nicknameInput === nickname}
        >
          업데이트
        </Button>
      </Layout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    margin: 2,
  },
  input: {
    flex: 1,
    margin: 2,
  },
  button: {
    margin: 2,
  },
});
