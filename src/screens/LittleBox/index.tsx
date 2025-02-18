import { ScreenBackground } from "@/components/Background/ScreenBackground";
import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "../Theme";
import { styles } from "./styles";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { useNavigation } from "@react-navigation/native";
import { RootStackList } from "@/routes/AppStacks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Panel } from "@/components/panel";

type StackScreenNavigationProp = NativeStackNavigationProp<RootStackList, "Tabs">;

export default function LittleBox() {

  const [visibleBalance, setVisibleBalance] = React.useState(false);

  const navigation = useNavigation<StackScreenNavigationProp>();



  function handleGoNewLittleBox() {
    navigation.navigate('NewLittleBox');
  }

  function handleGoLittleBoxDetails() {
    navigation.navigate('LittleBoxDetails');
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
        onPress={handleGoLittleBoxDetails}
      />
      <Panel
        name="Fatura"
        balance="1000,00"
        progress={80}
      />
    </ScreenBackground>
  );
}
