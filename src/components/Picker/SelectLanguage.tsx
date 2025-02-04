import React from "react";
import { View, Text } from "react-native";
import { MyPicker } from "./MyPicker";
import { useLanguageStore } from "@/stores/LanguageStore";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "@/screens/Theme";

export function SelectLanguage() {
  const { language, setLanguage } = useLanguageStore();

  const listLanguage = language?.SelectLanguage.map((lang) => {
    return { name: lang.Name, value: lang.Acronym };
  });

  return (
    <MyPicker onValueChange={(opt) => setLanguage(opt)} list={listLanguage}>
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Feather name="globe" color={MyTheme.colors.white} size={24} />
        <Text style={{ color: MyTheme.colors.white }}>
          {language?.Name.toUpperCase()}
        </Text>
      </View>
    </MyPicker>
  );
}
