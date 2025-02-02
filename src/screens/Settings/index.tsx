import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import { logout } from "@/firebase/auth/FirebaseAuth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackList } from "@/routes/AppStacks";
import { CommonActions, useNavigation } from "@react-navigation/native";

type StackScreenNavigationProp = NativeStackNavigationProp<
  RootStackList,
  "Tabs"
>;

export default function Settings() {
  const navigation = useNavigation<StackScreenNavigationProp>();
  function executeLogout() {
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }
  return (
    <View style={styles.main}>
      <Text>CONFIG</Text>
      <Text>CONFIG</Text>
      <Text>CONFIG</Text>
      <Text>CONFIG</Text>
      <Text>CONFIG</Text>
      <TouchableOpacity style={styles.button} onPress={() => executeLogout()}>
        <Feather color="#FFF" name="log-out" size={20} />
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
