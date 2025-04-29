import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20
  },
  listcontainer: {
    position: 'absolute',
    top: 48,
    width: '98%',
    maxHeight: 180,
    paddingHorizontal: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: MyTheme.colors.background,
    alignSelf: 'center',
  }
})