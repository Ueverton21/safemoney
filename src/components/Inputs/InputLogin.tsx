import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

export function InputLogin(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={"#AAA"}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#010101",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 60,
    fontSize: 16,
    marginTop: 16,
    color: "#AAA",
  },
});
