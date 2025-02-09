import { MyTheme } from "@/screens/Theme";
import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  text?: string;
  backgroundTranspatent?: boolean;
  color: string;
  smallHeight?: boolean;
  loading?: boolean;
  children?: ReactNode;
};

export function ButtonSubmit({
  text,
  backgroundTranspatent,
  color,
  loading = false,
  smallHeight = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundTranspatent ? "rgba(0,0,0,0)" : color,
          borderColor: backgroundTranspatent ? color : "rgba(0,0,0,0)",
          borderWidth: backgroundTranspatent ? 2 : 0,
          height: smallHeight ? "auto" : 42,
        },
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={MyTheme.colors.white} size={16} />
      ) : children ? (
        <>{children}</>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: MyTheme.colors.white,
    fontWeight: 600,
  },
});
