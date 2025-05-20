import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  listcontainer: {
    position: 'absolute',
    top: 48,
    width: '98%',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: MyTheme.colors.background,
    alignSelf: 'center',
  },
  goalValueLabel: {
    color: MyTheme.colors.white,
    fontSize: 22,
  },
})