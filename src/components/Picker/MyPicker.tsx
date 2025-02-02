import { MyTheme } from "@/screens/Theme";
import React, { Children, Component, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type PickerProps = {
  list?: { name: string; value: string }[];
  children: React.ReactNode;
  onValueChange: (value: string) => void;
};

export function MyPicker({ list, onValueChange, children }: PickerProps) {
  const [visibleOptions, setVisibleOptions] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setVisibleOptions(true)}>
        {children}
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={visibleOptions}>
        <View style={styles.modal}>
          <ScrollView style={styles.modalContent}>
            {list?.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => {
                  onValueChange(opt.value);
                  setVisibleOptions(false);
                }}
                style={styles.item}
              >
                <Text style={styles.itemText}>{opt.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(4,4,4,.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: 180,
    borderRadius: 12,
    backgroundColor: MyTheme.colors.background_secondary,
    paddingHorizontal: 8,
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
});
