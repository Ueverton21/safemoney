import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { MyTheme } from "../Theme";
import { InputLogin } from "@/components/Inputs/InputLogin";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";

import { useNavigation } from "@react-navigation/native";

const icon = require("@/assets/icon_light.png");
import { RootStackList } from "routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authenticate } from "@/firebase/auth/FirebaseAuth";

type Props = NativeStackScreenProps<RootStackList, "Login">;

export default function Login({ navigation }: Props) {
  useEffect(() => {
    async function testing() {
      try {
        var auth = await authenticate("uevertoandrade@gmail.com", "Nagato@10");

        if (auth != undefined) {
          console.log("LOGADOOOOOOOOOOOOOOOOOOO");
        } else {
          console.log("CREDENCIAIS INVÁLIDAS");
        }
      } catch (error) {
        console.log({ error });
      }
    }
    testing();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 160,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{ height: 80, marginBottom: 100 }}
        />
      </View>

      <InputLogin placeholder="Email" />
      <InputLogin placeholder="Senha" />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        activeOpacity={0.7}
        text="Login"
        color={MyTheme.colors.primary}
      />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        onPress={() => navigation.navigate("Create")}
        activeOpacity={0.5}
        text="Criar"
        backgroundTranspatent
        color={MyTheme.colors.primary}
      />
    </View>
  );
}
