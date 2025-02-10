import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import { logout } from "@/firebase/auth/FirebaseAuth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackList } from "@/routes/AppStacks";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { MyPicker } from "@/components/Picker/MyPicker";
import { useLanguageStore } from "@/stores/LanguageStore";
import { MyTheme } from "../Theme";
import { SelectLanguage } from "@/components/Picker/SelectLanguage";
import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { ButtonIcon } from "@/components/Buttons/ButtonIcon";

type StackScreenNavigationProp = NativeStackNavigationProp<
  RootStackList,
  "Tabs"
>;

export default function Settings() {
  const { language } = useLanguageStore();
  const navigation = useNavigation<StackScreenNavigationProp>();

  function executeLogout() {
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }
  return (
    <ScreenBackground title="Configurações">
      <ButtonIcon
        backgroundColor={MyTheme.colors.red}
        backgroundTransparent={true}
        color={MyTheme.colors.red}
        icon="log-out"
        text={language?.Settings.Exit!}
        onPress={() => executeLogout()}
      />
      <View style={{ marginTop: 20 }}></View>
      <ButtonIcon
        backgroundColor={MyTheme.colors.primary}
        backgroundTransparent={true}
        color={MyTheme.colors.primary}
        icon="user"
        text={"Perfil"}
        onPress={() => navigation.navigate("Profile")}
      />
      <SelectLanguage />
    </ScreenBackground>
  );
}
