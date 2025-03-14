import { ScreenBackground } from "@/components/Background/ScreenBackground";
import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "../Theme";
import { styles } from "./styles";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Panel } from "@/components/panel";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackList } from "@/routes/AppStacks";
import { useNavigation } from "@react-navigation/native";
import { useLanguageStore } from "@/stores/LanguageStore";

type StackScreenNavigationProp = NativeStackNavigationProp<RootStackList, "Tabs">;

export default function LittleBox() {

  const [visibleBalance, setVisibleBalance] = React.useState(false);

  const navigation = useNavigation<StackScreenNavigationProp>()

  const { language } = useLanguageStore();

  function handleGoNewGroup() {
    navigation.navigate('NewGroup');
  }
  function handleGoGroupDetails() {
    navigation.navigate('GroupDetails');
  }

  return (
    <ScreenBackground
      title={language!.Groups.Title}
    >
      <View style={styles.container}>
        <Panel
          name="Carro"
          balance="7000,00"
          progress={25}
          onPress={handleGoGroupDetails}
        >
          <FontAwesome6 name="key" size={24} color={MyTheme.colors.white} />
        </Panel>
        <Panel
          name="Fatura"
          balance="1000,00"
          progress={80}
        >
          <FontAwesome6 name="credit-card" size={24} color={MyTheme.colors.white} />
        </Panel>
        <ButtonSubmit text={language!.Groups.NewGroup} color={MyTheme.colors.secondary} onPress={handleGoNewGroup} />
      </View>
    </ScreenBackground>
  );
}
