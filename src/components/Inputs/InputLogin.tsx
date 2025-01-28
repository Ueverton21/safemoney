import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

type InputLoginProps = TextInputProps & {
  setValue: Function;
};

export function InputLogin({ setValue, ...rest }: InputLoginProps) {
  return (
    <TextInput
      {...rest}
      onChangeText={(text) => setValue(text)}
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
