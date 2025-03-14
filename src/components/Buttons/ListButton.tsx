import { MyTheme } from "@/screens/Theme";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from "react-native";

type ListButtonType = TouchableHighlightProps & {
  title: string;
  children?: React.ReactNode;
}
export function ListButton({ title, children, ...rest }: ListButtonType) {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableHighlight
      {...rest}
      underlayColor={MyTheme.colors.medium_gray}
      style={[styles.button, { borderRadius: isFocused ? 8 : 0, borderColor: isFocused ? 'transparent' : MyTheme.colors.secondary, }]}
      activeOpacity={0.2}
      onPressIn={() => {
        setIsFocused(true)
      }}
      onPressOut={() => {
        setIsFocused(false)
      }}
    >
      <View
        style={
          [
            styles.container,
            {
              justifyContent: children ? 'space-between' : 'center',
              backgroundColor: children ? 'transparent' : MyTheme.colors.background,
            }
          ]
        }
      >
        <Text style={styles.title}>{title}</Text>
        {
          children ? <>{children}</> : null
        }
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 42,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingTop: 3,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 16,
    color: MyTheme.colors.white,
    marginBottom: 9
  }
});