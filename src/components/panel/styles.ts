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