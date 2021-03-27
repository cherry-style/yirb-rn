import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
} from "@ui-kitten/components";
import * as React from "react";
import { LiveScreen } from "../screens/LiveScreen";
import ReplayScreen from "../screens/ReplayScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const RadioIcon = (props: IconProps) => <Icon {...props} name="radio" />;
const StarIcon = (props: IconProps) => <Icon {...props} name="star" />;
const PersonIcon = (props: IconProps) => <Icon {...props} name="person" />;

function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="생방송" icon={RadioIcon} />
      <BottomNavigationTab title="다시 듣기" icon={StarIcon} />
      <BottomNavigationTab title="프로필" icon={PersonIcon} />
    </BottomNavigation>
  );
}

export default function BottomTabNavigator() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Live" component={LiveScreen} />
      <Screen name="Replay" component={ReplayScreen} />
      <Screen name="Settings" component={SettingsScreen} />
    </Navigator>
  );
}
