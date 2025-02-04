import { MyTheme } from "@/screens/Theme";
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps } from "react-native";

type ListButtonType = TouchableHighlightProps & {
  title: string;
}
export function ListButton({ title, ...rest }: ListButtonType) {
  return (
    <TouchableHighlight {...rest} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: MyTheme.colors.background,
    borderColor: MyTheme.colors.background_secondary,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    color: MyTheme.colors.white
  }
});