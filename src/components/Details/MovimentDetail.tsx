import { MyTheme } from "@/screens/Theme";
import { Moviment } from "@/stores/MovimentType";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export function MovimentDetail(moviment: Moviment) {
  return (
    <View style={styles.main}>
      <Feather
        name={moviment.Type == "entry" ? "chevron-up" : "chevron-down"}
        size={24}
        color={
          moviment.Type == "entry" ? MyTheme.colors.primary : MyTheme.colors.red
        }
      />
      <View style={styles.info}>
        <Text style={styles.title}>{moviment.Description}</Text>
        {moviment.Type == "entry" ? (
          <Text style={styles.value}>{"R$ " + moviment.Value}</Text>
        ) : (
          <Text style={styles.value}>{"R$ -" + moviment.Value}</Text>
        )}
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1 }}
      >
        <Text style={styles.date}>Hoje</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    color: MyTheme.colors.white,
    fontWeight: 600,
  },
  info: {
    marginLeft: 10,
  },
  value: {
    color: MyTheme.colors.textOpace,
    fontSize: 18,
    fontWeight: 300,
  },
  date: {
    fontSize: 14,
    color: MyTheme.colors.textOpace,
  },
});
