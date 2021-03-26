import { Audio, AVPlaybackStatus } from "expo-av";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export function Player() {
  const [message, setMessage] = useState("방송 듣기");
  const [sound, setSound] = useState<Audio.Sound>();

  const toggleLive = useCallback(async () => {
    if (sound !== undefined) {
      setSound(undefined);
      return;
    }

    setMessage("생방송을 불러오고 있습니다...");
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: "https://streaming.radio.co/s2ce4fad17/listen",
    });
    setSound(newSound);
  }, [sound]);

  const handlePlaybackStatusUpdate = useCallback(
    (playbackStatus: AVPlaybackStatus) => {
      playbackStatus.isLoaded;
    },
    []
  );

  useEffect(() => {
    if (sound === undefined) {
      return;
    }

    sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    setMessage("생방송 청취 중");
    sound.playAsync();
    return () => {
      setMessage("생방송 듣기");
      sound.unloadAsync();
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title={message} onPress={toggleLive} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
});
