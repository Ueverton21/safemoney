import { MyTheme } from "@/screens/Theme";
import React from "react";
import {
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
} from "react-native";

type SelectedButtonTypes = TouchableOpacityProps & {
  text: string;
  isSelected?: boolean;
};

function SelectedButton({ text, isSelected, ...rest }: SelectedButtonTypes) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        borderRadius: 8,
        minWidth: 80,
        borderColor: isSelected
          ? MyTheme.colors.textOpace
          : MyTheme.colors.medium_gray,
        borderWidth: 2,
      }}
      {...rest}
    >
      <Text
        style={{ fontSize: 14, fontWeight: 600, color: MyTheme.colors.white }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
export default SelectedButton;
