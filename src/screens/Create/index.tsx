import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MyTheme } from "../Theme";
import { Input } from "@/components/Inputs/Input";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { RootStackList } from "@/routes/AppStacks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ErrorMessage } from "@/components/Errors/ErrorMessage";
import { createUser } from "@/firebase/auth/FirebaseAuth";
import { ToAddUser } from "@/firebase/firestore/FirestoreUser";
import { FirebaseError } from "firebase/app";
import { useLanguageStore } from "@/stores/LanguageStore";
import { AuthErrors } from "@/firebase/AuthErrors";

const icon = require("@/assets/icon_light.png");

type StackScreenNavigationProp = NativeStackNavigationProp<
  RootStackList,
  "Create"
>;

export default function Create() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation<StackScreenNavigationProp>();
  const { language } = useLanguageStore();

  async function handleCreate() {
    try {
      const user = await createUser(email, password);

      await ToAddUser(name, lastName, email);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        })
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
        var authErrors = new AuthErrors();
        setError(authErrors.parseError(language!, error.code));
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 140,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.imageView}>
        <Image source={icon} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.name}>
        <View style={{ width: "48%" }}>
          <Input
            setValue={setName}
            value={name}
            placeholder={language?.Create.Name}
          />
        </View>
        <View style={{ marginHorizontal: "2%" }}></View>
        <View style={{ width: "48%" }}>
          <Input
            setValue={setLastName}
            value={lastName}
            placeholder={language?.Create.LastName}
          />
        </View>
      </View>
      <Input
        setValue={setEmail}
        value={email}
        placeholder={language?.Login.FieldEmail}
      />
      <Input
        setValue={setPassword}
        value={password}
        placeholder={language?.Login.Password}
        message={error}
      />
      <View style={{ marginTop: 10 }}></View>
      <ButtonSubmit
        activeOpacity={0.7}
        text={language?.Login.Create!}
        onPress={handleCreate}
        color={MyTheme.colors.primary}
      />
      <View style={{ marginTop: 20 }}></View>
      <ButtonSubmit
        activeOpacity={0.5}
        text={language?.Create.HaveAccount!}
        backgroundTranspatent
        onPress={() => navigation.push("Login")}
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
