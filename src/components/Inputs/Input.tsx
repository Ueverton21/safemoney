import React, { ReactNode } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

import { MyTheme } from "@/screens/Theme";

import { ErrorMessage } from "../Errors/ErrorMessage";

type InputLoginProps = TextInputProps & {
  setValue: Function;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  message?: string;
};

export function Input({ setValue, message, leftIcon, rightIcon, ...rest }: InputLoginProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {leftIcon}
        <TextInput
          {...rest}
          onChangeText={(text) => setValue(text)}
          style={styles.input}
          placeholderTextColor={MyTheme.colors.placeholder_color}

        />
        {rightIcon}
      </View>
      {message && <ErrorMessage message={message} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    justifyContent: 'space-between',
    height: 82,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: MyTheme.colors.background_dark,
    borderRadius: 8,
    paddingLeft: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 60,
    fontSize: 16,
    color: MyTheme.colors.white,
  },
});
