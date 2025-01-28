import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTheme } from "../screens/Theme";

import Login from "../screens/Login";
import Create from "@/screens/Create";
import AppTabs from "@/routes/AppTabs";
import { userIsAuthenticated } from "@/firebase/auth/FirebaseAuth";

export type RootStackList = {
  Login: undefined;
  Create: undefined;
  Tabs: undefined;
};

export default function AppStack() {
  const Stack = createNativeStackNavigator<RootStackList>();
  const [userIsLogged, setUserLogged] = useState<boolean>(false);

  useEffect(() => {
    async function loading() {
      var isLogged = await userIsAuthenticated();
      setUserLogged(isLogged);
    }
    loading();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userIsLogged ? (
          <Stack.Screen name="Tabs" component={AppTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Create" component={Create} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
