import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MyTheme } from "../Theme";
import { Input } from "@/components/Inputs/Input";
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
import { MyPicker } from "@/components/Picker/MyPicker";
import { useUserStore } from "@/stores/UserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectLanguage } from "@/components/Picker/SelectLanguage";
import { useMovimentStore } from "@/stores/MovimentStore";

type Props = NativeStackScreenProps<RootStackList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const { language } = useLanguageStore();
  const { getUser } = useUserStore();
  const { getMovimentsByMonth } = useMovimentStore();

  function executeStores(email: string) {
    getUser(email!);
    var date = new Date();
    var monthSelect = date.getMonth();
    var yearSelect = date.getFullYear();
    getMovimentsByMonth(email!, monthSelect + 1, yearSelect);
  }

  useEffect(() => {
    async function initial() {
      var isLoggedUser = await userIsAuthenticated();

      if (isLoggedUser) {
        const emailStorage = await AsyncStorage.getItem("@email");
        executeStores(emailStorage!);

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
        await AsyncStorage.setItem("@email", email);
        executeStores(email);
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
      <Input
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        placeholder={language?.Login.FieldEmail}
      />
      <Input
        secureTextEntry={true}
        value={password}
        onChangeText={(txt) => setPassword(txt)}
        placeholder={language?.Login.Password}
        message={error}
      />
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
      <SelectLanguage />
    </View>
  ) : (
    <ScreenLoading />
  );
}
