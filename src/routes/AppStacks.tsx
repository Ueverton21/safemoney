import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTheme } from "../screens/Theme";

import Login from "@/screens/Login";
import Create from "@/screens/Create";
import AppTabs from "@/routes/AppTabs";
import Profile from "@/screens/Profile";
import { useLanguageStore } from "@/stores/LanguageStore";

export type RootStackList = {
  Login: undefined;
  Create: undefined;
  Tabs: undefined;
  Profile: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
