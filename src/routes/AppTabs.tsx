import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "@/screens/Home";

export type RootTabsList = {
  Home: undefined;
};

export default function AppTabs() {
  const Tab = createBottomTabNavigator<RootTabsList>();
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
