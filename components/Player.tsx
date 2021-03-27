import { Audio, AVPlaybackStatus } from "expo-av";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

function getStatusMessage(playbackStatus: AVPlaybackStatus) {
  if (!playbackStatus.isLoaded) {
    if (playbackStatus.error !== undefined) {
      return "[오류] 다시 시도해주세요";
    }
    return "생방송 불러오는 중...";
  }

  if (playbackStatus.isPlaying) {
    return "스트리밍 중";
  }

  if (playbackStatus.isBuffering) {
    return "스트리밍 불러오는 중...";
  }

  if (playbackStatus.didJustFinish) {
    return "방송이 종료되었습니다";
  }

  return "방송 송출을 기다리고 있습니다...";
}

export function Player() {
  const [message, setMessage] = useState("생방송 듣기");
  const [sound, setSound] = useState<Audio.Sound>();

  const handlePlaybackStatusUpdate = useCallback(
    (playbackStatus: AVPlaybackStatus) => {
      setMessage(getStatusMessage(playbackStatus));
    },
    []
  );

  const toggleLive = useCallback(async () => {
    if (sound !== undefined) {
      setSound(undefined);
      return;
    }

    const newSound = new Audio.Sound();
    newSound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    await newSound.loadAsync({
      uri: "https://streaming.radio.co/s2ce4fad17/listen",
    });
    setSound(newSound);
  }, [sound, handlePlaybackStatusUpdate]);

  useEffect(() => {
    if (sound === undefined) {
      return;
    }

    sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    sound.playAsync();
    return () => {
      sound.unloadAsync().then(() => setMessage("생방송 듣기"));
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
