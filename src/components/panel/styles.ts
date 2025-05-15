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
    gap: 15
  },
  name: {
    fontSize: 18,
    color: MyTheme.colors.white,
    maxWidth: '55%'
  },
  buttonDate: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    color: MyTheme.colors.white,
    fontSize: 14,
    marginRight: 5,
  },
  balance: {
    fontSize: 18,
    color: MyTheme.colors.white,
    flex: 1,
    textAlign: 'right'
  },
  balanceInDetail: {
    fontSize: 20,
    color: MyTheme.colors.white,
    flex: 1,
    textAlign: 'center'
  },
  progressContainer: {
    width: '100%',
    backgroundColor: MyTheme.colors.secondary,
    height: 4,
  },
  progress: {
    backgroundColor: MyTheme.colors.primary,
    height: 4,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  }
});