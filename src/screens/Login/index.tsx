import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MyTheme } from "../Theme";
import { InputLogin } from "@/components/Inputs/InputLogin";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Feather } from "@expo/vector-icons";

import { RootStackList } from "@/routes/AppStacks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  authenticate,
  userIsAuthenticated,
} from "@/firebase/auth/FirebaseAuth";
import { ScreenLoading } from "./ScreenLoading";
import { FirebaseError } from "firebase/app";
import { ErrorMessage } from "@/components/Errors/ErrorMessage";
import { useLanguageStore } from "@/stores/LanguageStore";
const icon = require("@/assets/icon_light.png");
import { Picker } from "@react-native-picker/picker";
import { AuthErrors } from "@/firebase/AuthErrors";

type Props = NativeStackScreenProps<RootStackList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [visibleLanguageSelect, setVisibleLanguageSelect] = useState(false);

  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    async function initial() {
      var isLoggedUser = await userIsAuthenticated();

      if (isLoggedUser) {
        navigation.navigate("Tabs");
      } else {
        setPageLoading(false);
      }
    }
    initial();
  }, []);

  async function handleLogin() {
    try {
      setLoading(true);
      var auth = await authenticate(email, password);
      if (auth) {
        navigation.navigate("Tabs");
      } else {
        console.log("CREDENCIAIS INVÁLIDAS");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        var authErrors = new AuthErrors();
        setError(authErrors.parseError(language!, error.code));
      } else {
        setError("Houve um problema, contate o adminitrador.");
      }
    } finally {
      setLoading(false);
    }
  }

  return !pageLoading ? (
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
          style={{ height: 80, marginBottom: 60 }}
        />
      </View>
      <InputLogin
        value={email}
        setValue={setEmail}
        placeholder={language?.Login.FieldEmail}
      />
      <InputLogin
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
        placeholder={language?.Login.Password}
      />
      <ErrorMessage message={error} />
      <View style={{ marginTop: 10 }}></View>
      <ButtonSubmit
        loading={loading}
        onPress={() => handleLogin()}
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
      {visibleLanguageSelect && (
        <Picker
          style={{ marginTop: -20 }}
          itemStyle={{ color: MyTheme.colors.white }}
          selectedValue={language?.Name}
          onValueChange={(value) => {
            setLanguage(value);
            setVisibleLanguageSelect(false);
          }}
        >
          {language?.SelectLanguage.map((option) => (
            <Picker.Item
              key={option.Name}
              label={option.Name}
              value={option.Acronym}
            />
          ))}
        </Picker>
      )}

      <View style={{ alignItems: "center", marginTop: 16 }}>
        <TouchableOpacity onPress={() => setVisibleLanguageSelect(true)}>
          <Feather name="globe" color={MyTheme.colors.white} size={24} />
        </TouchableOpacity>
        <Text style={{ color: MyTheme.colors.white }}>
          {language?.Name.toUpperCase()}
        </Text>
      </View>
    </View>
  ) : (
    <ScreenLoading />
  );
}
