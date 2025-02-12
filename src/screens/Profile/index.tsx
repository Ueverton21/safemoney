import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Input } from "@/components/Inputs/Input";
import React, { useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { useUserStore } from "@/stores/UserStore";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { MyTheme } from "../Theme";

export default function Profile() {
  const [name, setName] = useState("");
  const { user } = useUserStore();
  return (
    <ScreenBackground title="Perfil">
      <Text style={styles.textBase}>Nome</Text>
      <Input setValue={setName} placeholder="Nome" value={user?.Name} />
      <Text style={styles.textBase}>Email</Text>
      <Input
        editable={false}
        setValue={setName}
        placeholder="Email"
        value={user?.Email}
      />
      <Text style={styles.textBase}>Alterar senha</Text>
      <Input
        setValue={setName}
        placeholder="Senha atual"
        secureTextEntry={true}
      />
      <Input
        setValue={setName}
        placeholder="Nova senha"
        secureTextEntry={true}
      />
      <ButtonSubmit color={MyTheme.colors.primary} text="Confirmar" />
    </ScreenBackground>
  );
}
