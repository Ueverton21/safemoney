import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTheme } from "../screens/Theme";

import Login from "@/screens/Login";
import Create from "@/screens/Create";
import AppTabs from "@/routes/AppTabs";
import Profile from "@/screens/Profile";
import NewLittleBox from "@/screens/NewLittleBox";
import NewGroup from "@/screens/NewGroup";
import LittleBoxDetails from "@/screens/LittleBoxDetails";

import { useLanguageStore } from "@/stores/LanguageStore";
import GroupDetails from "@/screens/GroupDetails";

export type RootStackList = {
  Login: undefined;
  Create: undefined;
  Tabs: undefined;
  Profile: undefined;
  NewLittleBox: undefined;
  NewGroup: undefined;
  LittleBoxDetails: undefined;
  GroupDetails: undefined;
};

export default function AppStack() {
  const Stack = createNativeStackNavigator<RootStackList>();
  const language = useLanguageStore();

  useEffect(() => {
    //Inicializar
    language.getLanguage();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Tabs" component={AppTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="NewLittleBox" component={NewLittleBox} />
        <Stack.Screen name="NewGroup" component={NewGroup} />
        <Stack.Screen name="LittleBoxDetails" component={LittleBoxDetails} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
