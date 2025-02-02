import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  boxBalance: {
    marginTop: 60,
    width: "80%",
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    zIndex: 1,
  },
  text: {
    color: MyTheme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: MyTheme.colors.background_secondary,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
  },
});
