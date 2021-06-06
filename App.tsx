import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { useInitialSetup } from "./hooks/useInitialSetup";
import Navigation from "./navigation";

export default function App() {
  useInitialSetup();

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <></>;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RecoilRoot>
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <Navigation colorScheme={colorScheme} />
              </SafeAreaView>
              <StatusBar />
            </SafeAreaProvider>
          </RecoilRoot>
        </ApplicationProvider>
      </>
    );
  }
}
