import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  movementContainer: {
    width: '100%',
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