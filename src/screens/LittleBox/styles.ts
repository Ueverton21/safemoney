import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  totalBox: {
    marginBottom: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 12,
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
  },
  listMovimentsEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  listMovimentsEmptyText: {
    color: MyTheme.colors.placeholder_color,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 300,
    letterSpacing: 0.8
  }
});