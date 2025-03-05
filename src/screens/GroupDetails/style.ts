import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  buttonGoal: {
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 6,
    alignSelf: 'center'
  },
  goal: {
    color: MyTheme.colors.white,
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  Title: {
    color: MyTheme.colors.white,
    fontSize: 22,
  },
  newTransation: {
    paddingBottom: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: MyTheme.colors.secondary
  },
  contributionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 6,
    gap: 5,
    width: '75%',
    backgroundColor: MyTheme.colors.background
  },
  contributionsText: {
    fontSize: 16,
    color: MyTheme.colors.white
  },
  historyContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderColor: MyTheme.colors.secondary,
    borderTopWidth: 1,
  }
});