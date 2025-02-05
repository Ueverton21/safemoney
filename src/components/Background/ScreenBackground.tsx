import { MyTheme } from "@/screens/Theme";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";

type ScreenBackgroundProps = {
  children: React.ReactNode;
  title: string;
};
export function ScreenBackground({ children, title }: ScreenBackgroundProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
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
