import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTheme } from "./src/screens/Theme";

import Login from "./src/screens/Login";
import Create from "@/screens/Create";

export type RootStackList = {
  Login: undefined;
  Create: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackList>();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Create" component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
