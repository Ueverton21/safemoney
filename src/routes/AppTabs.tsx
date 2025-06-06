import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Home from "@/screens/Home";
import LittleBox from "@/screens/LittleBox";
import Settings from "@/screens/Settings";
import ToAdd from "@/screens/ToAdd";
import { Platform, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackList } from "./AppStacks";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Dashboard from "@/screens/Dashboard";

export type RootTabsList = {
  Home: undefined;
  LittleBox: undefined;
  Dashboard: undefined;
  Settings: undefined;
  ToAdd: undefined;
};

type Props = NativeStackScreenProps<RootStackList, "Tabs">;

const TAB_HEIGHT_ANDROID = 60;
const TAB_HEIGHT_IOS = 80;
export default function AppTabs(props: Props) {
  const Tab = createBottomTabNavigator<RootTabsList>();

  const inset = useSafeAreaInsets().bottom + TAB_HEIGHT_ANDROID;

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBeforeRemove = (e: any) => {
        e.preventDefault(); // bloqueia o voltar só dentro das tabs
      };

      navigation.addListener('beforeRemove', onBeforeRemove);

      return () => {
        navigation.removeListener('beforeRemove', onBeforeRemove);
      };
    }, [navigation])
  );


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1b1b1b",
        tabBarInactiveTintColor: "#FFF",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          height: Platform.OS === "android" ? inset : TAB_HEIGHT_IOS,
          backgroundColor: "#4F4F4F",
          borderColor: "rgba(0,0,0,0)",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon({ color }) {
            return <Feather color={color} size={28} name="home" />;
          },
        }}
      />
      <Tab.Screen
        name="LittleBox"
        component={LittleBox}
        options={{
          tabBarIcon({ color }) {
            return <Feather color={color} size={28} name="box" />;
          },
        }}
      />
      <Tab.Screen
        name="ToAdd"
        component={ToAdd}
        options={{
          tabBarIcon({ color }) {
            return (
              <View
                style={{
                  marginBottom: 24,
                  borderRadius: 27,
                  width: 54,
                  height: 54,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2f855a",
                }}
              >
                <Feather color={color} size={28} name="plus" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon({ color }) {
            return <Feather color={color} size={28} name="trending-up" />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon({ color }) {
            return <Feather color={color} size={28} name="settings" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
