import React from "react";
import { Image, View } from "react-native";
const icon = require("@/assets/icon_light.png");

export function ScreenLoading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={icon} resizeMode="contain" style={{ height: 80 }} />
    </View>
  );
}
