import { MyTheme } from "@/screens/Theme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CheckProps = {
  text: string;
  isSelected: boolean;
  selectedColor: string;
};

export function Check(props: CheckProps) {
  return (
    <View style={styles.main}>
      <View style={styles.check}>
        <View
          style={[
            styles.select,
            {
              backgroundColor: props.isSelected
                ? MyTheme.colors.primary
                : MyTheme.colors.background_dark,
            },
          ]}
        ></View>
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
  },
  check: {
    height: 28,
    width: 28,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MyTheme.colors.background_dark,
    marginRight: 4,
  },
  select: {
    height: 20,
    width: 20,
    borderRadius: 8,
  },
  text: {
    color: MyTheme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
