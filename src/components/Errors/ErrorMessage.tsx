import { MyTheme } from "@/screens/Theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <Text style={styles.message}>{message}</Text>;
}

const styles = StyleSheet.create({
  message: {
    fontWeight: "bold",
    fontSize: 14,
    color: MyTheme.colors.red,
  },
});
