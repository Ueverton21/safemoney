import { ScreenBackground } from "@/components/Background/ScreenBackground";
import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "../Theme";
import { styles } from "./styles";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { useNavigation } from "@react-navigation/native";
import { RootTabsList } from "@/routes/AppTabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Panel } from "@/components/panel";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type Props = NativeStackScreenProps<RootTabsList, "LittleBox">;

export default function LittleBox({ navigation }: Props) {

  const [visibleBalance, setVisibleBalance] = React.useState(false);



  function handleGoNewLittleBox() {
    navigation.navigate('NewLittleBox');
  }

  return (
    <ScreenBackground
      title="Caixinhas"
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
        <View
          style={styles.totalBox}
        >
          <Text
            style={styles.totalTitle}
          >
            Total
          </Text>
          <Text
            style={styles.totalValue}
          >
            R$ 2700,00
          </Text>
          <Feather
            name={visibleBalance ? "eye-off" : "eye"}
            size={20}
            color={MyTheme.colors.white}
          />
        </View>
        <View style={{ width: '20%' }}>
          <ButtonSubmit color={MyTheme.colors.primary} onPress={handleGoNewLittleBox}>
            <Feather name="plus" size={28} color={MyTheme.colors.white} />
          </ButtonSubmit>
        </View>
      </View>

      <Panel
        name="Carro"
        balance="7000,00"
        progress={25}
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
    </ScreenBackground>
  );
}
