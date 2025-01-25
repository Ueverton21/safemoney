import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MyTheme } from "../Theme";
import { InputLogin } from "@/components/Inputs/InputLogin";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";

const icon = require("@/assets/icon_light.png");

export default function Create() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 160,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.imageView}>
        <Image source={icon} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.name}>
        <View style={{ width: "48%" }}>
          <InputLogin placeholder="Nome" />
        </View>
        <View style={{ marginHorizontal: "2%" }}></View>
        <View style={{ width: "48%" }}>
          <InputLogin placeholder="Sobrenome" />
        </View>
      </View>

      <InputLogin placeholder="Email" />
      <InputLogin placeholder="Senha" />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        activeOpacity={0.7}
        text="Criar"
        color={MyTheme.colors.primary}
      />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        activeOpacity={0.5}
        text="Já tenho conta"
        backgroundTranspatent
        color={MyTheme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 80,
    marginBottom: 100,
  },
  name: {
    flexDirection: "row",
    alignContent: "space-between",
  },
});
