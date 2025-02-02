import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Home() {
  return (
    <View style={styles.main}>
      <View style={styles.boxBalance}>
        <Text style={styles.text}>Saldo: 1500,75 R$</Text>
      </View>
      <View style={styles.content}>
        <Text>EXAMPLE</Text>
      </View>
    </View>
  );
}
