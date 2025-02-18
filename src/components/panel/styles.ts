import { MyTheme } from "@/screens/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    color: MyTheme.colors.white
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
    fontSize: 18,
    marginRight: 5,
  },
  balance: {
    fontSize: 26,
    color: MyTheme.colors.white,
    textAlign: 'center',
    marginBottom: 30,
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