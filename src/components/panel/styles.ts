import { MyTheme } from "@/screens/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 5
  },
  name: {
    fontSize: 18,
    color: MyTheme.colors.white,
    maxWidth: '55%'
  },
  balance: {
    fontSize: 18,
    color: MyTheme.colors.white,
    flex: 1,
    textAlign: 'right'
  },
  balanceHidden: {
    height: 18,
    backgroundColor: MyTheme.colors.medium_gray,
    borderRadius: 2,
    width: 70,
  },
});