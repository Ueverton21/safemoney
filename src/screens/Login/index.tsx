import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { MyTheme } from "../Theme";
import { InputLogin } from "@/components/Inputs/InputLogin";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";

const icon = require("@/assets/icon_light.png");
import { RootStackList } from "@/routes/AppStacks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  authenticate,
  userIsAuthenticated,
} from "@/firebase/auth/FirebaseAuth";
import { Language, selectLanguage } from "@/translate/language";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackList, "Login">;

export default function Login({ navigation }: Props) {
  const [language, setLanguage] = useState<Language>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    async function initial() {
      setLanguage(selectLanguage("es"));

      // try {
      //   var auth = await authenticate("uevertonandrade@gmail.com", "Nagato@10");
      //   if (auth != undefined) {
      //     console.log("LOGADOOOOOOOOOOOOOOOOOOO");
      //   } else {
      //     console.log("CREDENCIAIS INVÁLIDAS");
      //   }
      // } catch (error) {
      //   console.log({ error });
      // }
    }
    initial();
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

      <InputLogin
        value={email}
        setValue={setEmail}
        placeholder={language?.Login.FieldEmail}
      />
      <InputLogin
        value={password}
        setValue={setPassword}
        placeholder={language?.Login.Password}
      />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        activeOpacity={0.7}
        text={language?.Login.Login!}
        color={MyTheme.colors.primary}
      />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        onPress={() => navigation.navigate("Create")}
        activeOpacity={0.5}
        text={language?.Login.Create!}
        backgroundTranspatent
        color={MyTheme.colors.primary}
      />
    </View>
  );
}
