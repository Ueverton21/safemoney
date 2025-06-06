import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ToastAndroid,
  Platform,
  Text,
  View
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useLanguageStore } from "@/stores/LanguageStore";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { useUserStore } from "@/stores/UserStore";
import { MyTheme } from "../Theme";
import { RootStackList } from "@/routes/AppStacks";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Panel } from "@/components/panel";
import { Loading } from "@/components/Loading";

import { styles } from "./styles";



type StackScreenNavigationProp = NativeStackNavigationProp<RootStackList, "Tabs">;

export default function LittleBox() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleBalance, setVisibleBalance] = useState(false);
  const navigation = useNavigation<StackScreenNavigationProp>();

  const { language } = useLanguageStore();
  const { user } = useUserStore();
  const { piggyBanks, getPiggyBanks, removePiggyBank } = usePiggyBankStore();

  const amountValue = piggyBanks && piggyBanks
    .reduce((acc, item) => acc + item.amountValue, 0)
    .toLocaleString(
      language!.Name === 'en' ? 'en-US' : 'pt-BR', {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  function handleGoNewLittleBox() {
    if (piggyBanks!.length >= 5) {
      showToastMaxNumberPiggyBank();
    } else {
      navigation.navigate('NewLittleBox');
    }
  }

  function handleGoLittleBoxDetails(piggyBankId: string) {
    navigation.navigate('LittleBoxDetails', { piggyBankId });
  }

  async function handleDeletePiggyBank(piggyBankId: string) {
    await removePiggyBank(piggyBankId, user!.Email).then(() => {
      showToastRemovedPiggyBank();
    })
    fetchPiggyBanks();
  }

  function fetchPiggyBanks() {
    getPiggyBanks(user!.Email);
  }

  function showToastRemovedPiggyBank() {
    Platform.OS === 'ios'
      ? Toast.show({
        type: "success",
        text1: language!.LittleBox.Remove,
        text2: language!.LittleBox.PiggyBankRemoved,
        visibilityTime: 1500,
      })
      : ToastAndroid.show(
        language!.LittleBox.PiggyBankRemoved,
        ToastAndroid.SHORT,
      );
  }

  function showToastMaxNumberPiggyBank() {
    Platform.OS === 'ios'
      ? Toast.show({
        type: "error",
        text1: language!.LittleBox.Remove,
        text2: language!.LittleBox.PiggyBankRemoved,
        visibilityTime: 1500,
      })
      : ToastAndroid.show(
        language!.LittleBox.Remove,
        ToastAndroid.SHORT,
      );
  }

  useEffect(() => {
    setIsLoading(true);
    fetchPiggyBanks();
    setIsLoading(false);
  }, [removePiggyBank])

  return (
    <ScreenBackground
      title={language!.LittleBox.Title}
    >
      <Toast position="bottom" bottomOffset={30} />

      {
        !isLoading ? (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              <View
                style={styles.totalBox}
              >
                <Text
                  style={styles.totalTitle}
                >
                  {language!.LittleBox.Amount}
                </Text>
                {
                  visibleBalance ? (
                    <Text
                      style={styles.totalValue}
                    >
                      {language!.CoinSymbol.Symbol} {amountValue}
                    </Text>
                  ) : (
                    <View style={styles.balanceHidden} />
                  )
                }
                <Pressable
                  onPress={() => setVisibleBalance(!visibleBalance)}
                >
                  <Feather
                    name={visibleBalance ? "eye-off" : "eye"}
                    size={20}
                    color={MyTheme.colors.white}
                  />
                </Pressable>

              </View>
              <View style={{ width: '20%' }}>
                <ButtonSubmit color={MyTheme.colors.primary} onPress={handleGoNewLittleBox} smallHeight>
                  <Feather name="plus" size={22} color={MyTheme.colors.white} />
                </ButtonSubmit>
              </View>
            </View>

            <FlatList
              data={piggyBanks ?? []}
              keyExtractor={(item) => item.id!}
              renderItem={({ item }) => {
                return (
                  <Panel
                    visibleBalance={visibleBalance}
                    balance={item.amountValue}
                    name={item.description}
                    progress={item.amountValue * 100 / item.goal}
                    onPress={() => handleGoLittleBoxDetails(item.id!)}
                    handleRemove={() => handleDeletePiggyBank(item.id!)}
                  />
                )
              }}
              contentContainerStyle={{
                flex: 1,
                gap: 25
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.listMovimentsEmptyContainer}>
                    <Text style={styles.listMovimentsEmptyText}>
                      {language!.LittleBox.ListEmpty}
                    </Text>
                  </View>
                )
              }}
            />
          </>
        ) : (
          <Loading />
        )
      }
    </ScreenBackground>
  );
}
