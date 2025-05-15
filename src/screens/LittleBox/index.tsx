import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "../Theme";
import { styles } from "./styles";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { useNavigation } from "@react-navigation/native";
import { RootStackList } from "@/routes/AppStacks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Panel } from "@/components/panel";
import { useLanguageStore } from "@/stores/LanguageStore";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { useUserStore } from "@/stores/UserStore";
import Toast from "react-native-toast-message";

type StackScreenNavigationProp = NativeStackNavigationProp<RootStackList, "Tabs">;

export default function LittleBox() {
  const [visibleBalance, setVisibleBalance] = useState(false);
  const navigation = useNavigation<StackScreenNavigationProp>();

  const { language } = useLanguageStore();
  const { user } = useUserStore();
  const { piggyBanks, getPiggyBanks, removePiggyBank } = usePiggyBankStore();

  const amountValue = piggyBanks ? piggyBanks.reduce((acc, item) => acc + item.amountValue, 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : '0,00'

  function handleGoNewLittleBox() {
    navigation.navigate('NewLittleBox');
  }

  function handleGoLittleBoxDetails(piggyBankId: string) {
    navigation.navigate('LittleBoxDetails', { piggyBankId });
  }

  async function handleDeletePiggyBank(piggyBankId: string) {
    console.log('sim')
    await removePiggyBank(piggyBankId, user!.Email).then(() => {
      showToastRemovedPiggyBank();
    })
    fetchPiggyBanks();
  }

  function fetchPiggyBanks() {
    getPiggyBanks(user!.Email);
  }

  function showToastRemovedPiggyBank() {
    Toast.show({
      type: "success",
      text1: "Remover",
      text2: "Caixinha removida",
      visibilityTime: 1500,
    });
  }

  useEffect(() => {
    fetchPiggyBanks();
  }, [removePiggyBank])

  return (
    <ScreenBackground
      title={language!.LittleBox.Title}
    >
      <Toast position="bottom" bottomOffset={30} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 32 }}>
        <View
          style={styles.totalBox}
        >
          <Text
            style={styles.totalTitle}
          >
            {language?.LittleBox.Amount}
          </Text>
          <Text
            style={styles.totalValue}
          >
            {language?.CoinSymbol.Symbol} {amountValue}
          </Text>
          <Feather
            name={visibleBalance ? "eye-off" : "eye"}
            size={20}
            color={MyTheme.colors.white}
          />
        </View>
        <View style={{ width: '20%' }}>
          <ButtonSubmit color={MyTheme.colors.primary} onPress={handleGoNewLittleBox} smallHeight>
            <Feather name="plus" size={22} color={MyTheme.colors.white} />
          </ButtonSubmit>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ gap: 25 }}>
        {
          piggyBanks && piggyBanks?.length > 0 ? (
            piggyBanks.map((item) => (
              <Panel
                key={item.id}
                balance={item.amountValue}
                name={item.description}
                progress={item.amountValue * 100 / item.goal}
                onPress={() => handleGoLittleBoxDetails(item.id!)}
                handleRemove={() => handleDeletePiggyBank(item.id!)}
              />
            ))
          ) : (
            <></>
          )
        }
      </ScrollView>
    </ScreenBackground>
  );
}
