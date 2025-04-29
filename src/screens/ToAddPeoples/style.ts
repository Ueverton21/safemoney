import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  ListButtonChildrenContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  ListButtonChildrenCod: {
    fontSize: 12,
    color: MyTheme.colors.white
  }
});