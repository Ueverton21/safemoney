import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  totalBox: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 5,
    flexDirection: "row",
    borderColor: MyTheme.colors.primary,
    alignItems: 'center',
    justifyContent: "center",
  },
  totalTitle: {
    fontSize: 17,
    color: MyTheme.colors.white
  },
  totalValue: {
    fontSize: 18,
    color: MyTheme.colors.white,
    marginRight: 7,
  },
});