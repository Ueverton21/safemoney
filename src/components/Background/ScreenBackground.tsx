import { MyTheme } from "@/screens/Theme";
import { SafeAreaView, View, StyleSheet, Text, TextInput, TextInputProps, TouchableWithoutFeedback } from "react-native";

type ScreenBackgroundProps = {
  children: React.ReactNode;
  title: string;
  editName?: boolean
} & TextInputProps;
export function ScreenBackground({ children, title, editName = false, ...rest }: ScreenBackgroundProps) {
  if (!editName) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback>
          <TextInput
            {...rest}
            style={styles.input}
            value={title}
          />
        </TouchableWithoutFeedback>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.colors.background,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: MyTheme.colors.white,
    textAlign: "center",
  },
  input: {
    padding: 0,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: MyTheme.colors.white,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: MyTheme.colors.background_secondary,
  },
});
