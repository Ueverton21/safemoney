import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  buttonGoal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    color: MyTheme.colors.white,
    fontSize: 16,
  },
  labelText: {
    color: MyTheme.colors.white,
    fontSize: 16,
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