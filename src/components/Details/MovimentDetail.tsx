import { MyTheme } from "@/screens/Theme";
import { Moviment } from "@/stores/MovimentTypes";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { dateToText } from "@/utils/TextDateMoviment";
import { AlertConfirm } from "../Alerts/AlertConfirm";

interface MovimentDetailProps {
  moviment: Moviment,
  handleRemove: () => Promise<void>
}

export function MovimentDetail({ moviment, handleRemove }: MovimentDetailProps) {
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);

  function closeAlertFirst() {
    setIsVisibleDelete(false);
    handleRemove();
  }
  return (
    <>
      <AlertConfirm
        isVisible={isVisibleDelete}
        onConfirm={() => closeAlertFirst()}
        onCancel={() => setIsVisibleDelete(false)}
        text="Deseja excluir essa movimentação?"
        title="Excluir"
        textButtons={{ confirm: "Sim", cancel: "Não" }}
      />

      <TouchableOpacity
        style={styles.main}
        onPress={() => setIsVisibleDelete(true)}
      >
        <Feather
          name={moviment.Type == "entry" ? "chevron-up" : "chevron-down"}
          size={24}
          color={
            moviment.Type == "entry"
              ? MyTheme.colors.primary
              : MyTheme.colors.red
          }
        />
        <View style={styles.info}>
          <Text style={styles.title}>{moviment.Description}</Text>
          {moviment.Type == "entry" ? (
            <Text style={styles.value}>
              {"R$ " +
                moviment.Value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
            </Text>
          ) : (
            <Text style={styles.value}>
              {"R$ -" +
                moviment.Value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={styles.date}>
            {moviment.Date && dateToText(moviment.Date)}
          </Text>
        </View>
      </TouchableOpacity>
    </>
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
