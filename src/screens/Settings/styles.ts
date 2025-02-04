import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  main: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  button: {
    height: 48,
    flexDirection: "row",
    borderRadius: 8,
    borderColor: MyTheme.colors.red,
    borderWidth: 2,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: MyTheme.colors.white,
    marginLeft: 8,
  },
});
