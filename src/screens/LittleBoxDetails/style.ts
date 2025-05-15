import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  buttonGoal: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 6,

    alignSelf: 'center',
    alignItems: 'center',
  },
  goalInput: {
    color: MyTheme.colors.white,
    fontSize: 18,
  },
  goalText: {
    color: MyTheme.colors.white,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  valueLabel: {
    color: MyTheme.colors.white,
    fontSize: 22,
  },
  newTransation: {
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: MyTheme.colors.secondary
  }
});