import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Home from "@/screens/Home";
import LittleBox from "@/screens/LittleBox";
import Groups from "@/screens/Groups";
import Settings from "@/screens/Settings";
import ToAdd from "@/screens/ToAdd";
import { Platform, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackList } from "./AppStacks";
import NewLittleBox from "@/screens/NewLittleBox";

export type RootTabsList = {
  Home: undefined;
  LittleBox: undefined;
  Groups: undefined;
  Settings: undefined;
  ToAdd: undefined;
};

type Props = NativeStackScreenProps<RootStackList, "Tabs">;
const TAB_HEIGHT_ANDROID = 60;
const TAB_HEIGHT_IOS = 80;
export default function AppTabs(props: Props) {
  const Tab = createBottomTabNavigator<RootTabsList>();

  const inset = useSafeAreaInsets().bottom + TAB_HEIGHT_ANDROID;

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
        name="Groups"
        component={Groups}
        options={{
          tabBarIcon({ color }) {
            return <Feather color={color} size={28} name="users" />;
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
      {/* <Tab.Screen
        name="NewLittleBox"
        component={NewLittleBox}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      /> */}
    </Tab.Navigator>
  );
}
