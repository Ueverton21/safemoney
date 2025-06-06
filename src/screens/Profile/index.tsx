import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Input } from "@/components/Inputs/Input";
import React, { useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { useUserStore } from "@/stores/UserStore";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { MyTheme } from "../Theme";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function Profile() {
  const [name, setName] = useState("");
  const { user } = useUserStore();
  const { language } = useLanguageStore();
  return (
    <ScreenBackground title={language!.Profile.Title}>
      <Text style={styles.textBase}>{language!.Profile.Name}</Text>
      <Input setValue={setName} placeholder={language!.Profile.Name} value={user?.Name} />
      <Text style={styles.textBase}>Email</Text>
      <Input
        editable={false}
        setValue={setName}
        placeholder="Email"
        value={user?.Email}
      />
      <Text style={styles.textBase}>{language!.Profile.ChangePassword}</Text>
      <Input
        setValue={setName}
        placeholder={language!.Profile.CurrentPassword}
        secureTextEntry={true}
      />
      <Input
        setValue={setName}
        placeholder={language!.Profile.NewPassword}
        secureTextEntry={true}
      />
      <ButtonSubmit color={MyTheme.colors.primary} text={language!.Profile.Comfirm} />
    </ScreenBackground>
  );
}
