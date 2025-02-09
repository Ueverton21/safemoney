import { MyTheme } from "@/screens/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: MyTheme.colors.white
  },
  balance: {
    fontSize: 26,
    color: MyTheme.colors.white,
    textAlign: 'center',
    marginBottom: 20,
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