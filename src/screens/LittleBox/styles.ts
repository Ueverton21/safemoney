import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  totalBox: {
    marginBottom: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 6,
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
    minWidth: 70,
    marginRight: 8,
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
  },
  balanceHidden: {
    height: 18,
    marginVertical: 3,
    marginRight: 8,
    backgroundColor: MyTheme.colors.medium_gray,
    borderRadius: 2,
    width: 100,
  },
});