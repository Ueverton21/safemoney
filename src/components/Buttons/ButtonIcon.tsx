import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { MyTheme } from "@/screens/Theme";

type ButtonIconProps = TouchableOpacityProps & {
  text: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
  backgroundColor: string;
  backgroundTransparent: boolean;
};

export function ButtonIcon({
  text,
  icon,
  color,
  backgroundColor,
  backgroundTransparent,
  ...rest
}: ButtonIconProps) {
  return (
    <View>
      <TouchableOpacity
        {...rest}
        style={[
          styles.button,
          {
            backgroundColor: backgroundTransparent
              ? "rgba(0,0,0,0)"
              : backgroundColor,
            borderColor: backgroundTransparent
              ? backgroundColor
              : "rgba(0,0,0,0)",
            borderWidth: backgroundTransparent ? 2 : 0,
          },
        ]}
      >
        <Feather color={color} name={icon} size={20} />
        <Text style={[styles.text, { color: color }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
