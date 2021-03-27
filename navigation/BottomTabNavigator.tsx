import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { LiveScreen } from "../screens/LiveScreen";
import ReplayScreen from "../screens/ReplayScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import {
  BottomTabParamList,
  LiveParamList,
  ReplayParamList,
  SettingsParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Live"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Live"
        component={LiveNavigator}
        options={{
          title: "생방송",
          tabBarIcon: ({ color }) => <TabBarIcon name="radio" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Replay"
        component={ReplayNavigator}
        options={{
          title: "다시 듣기",
          tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          title: "프로필",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LiveStack = createStackNavigator<LiveParamList>();

function LiveNavigator() {
  return (
    <LiveStack.Navigator>
      <LiveStack.Screen
        name="LiveScreen"
        component={LiveScreen}
        options={{ headerTitle: "생방송" }}
      />
    </LiveStack.Navigator>
  );
}

const ReplayStack = createStackNavigator<ReplayParamList>();

function ReplayNavigator() {
  return (
    <ReplayStack.Navigator>
      <ReplayStack.Screen
        name="ReplayScreen"
        component={ReplayScreen}
        options={{ headerTitle: "다시 듣기" }}
      />
    </ReplayStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: "프로필" }}
      />
    </SettingsStack.Navigator>
  );
}
