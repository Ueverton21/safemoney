import { MyTheme } from "@/screens/Theme";
import React, { Children, Component, ReactNode, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type AlertConfirmProps = {
  title: string;
  text: string;
  textButtons: { confirm: string; cancel: string };
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AlertConfirm({
  title,
  text,
  textButtons,
  onConfirm,
  onCancel,
  isVisible,
}: AlertConfirmProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onConfirm()}
              style={[
                styles.button,
                { backgroundColor: MyTheme.colors.primary },
              ]}
            >
              <Text style={styles.buttonText}>{textButtons.confirm}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: MyTheme.colors.red }]}
              onPress={() => onCancel()}
            >
              <Text style={styles.buttonText}>{textButtons.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(4,4,4,.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: 180,
    borderRadius: 8,
    backgroundColor: MyTheme.colors.background_secondary,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  item: {
    height: 60,
    justifyContent: "center",
    borderBottomColor: "#333",
    borderBottomWidth: 2,
  },
  itemText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
    color: "#FFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: MyTheme.colors.white,
    borderBottomColor: MyTheme.colors.medium_gray,
    borderBottomWidth: 0.5,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: MyTheme.colors.white,
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
  },
  button: {
    height: 32,
    minWidth: 60,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginRight: 8,
  },
  buttonText: {
    color: MyTheme.colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
