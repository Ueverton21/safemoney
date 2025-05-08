import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { use, useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { MyTheme } from "../Theme";
import { Input } from "@/components/Inputs/Input";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useUserStore } from "@/stores/UserStore";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { PiggyBank } from "@/stores/PiggyBankType";
import { useRoute } from "@react-navigation/native";
import { useLanguageStore } from "@/stores/LanguageStore";
import { decimalMask } from "@/utils/Masks";
import { Moviment } from "@/stores/MovimentType";
import { MovimentDetail } from "@/components/Details/MovimentDetail";

type RouteParams = {
  piggyBankId: string;
}

export default function LittleBoxDetails() {
  const [piggyBank, setpiggyBank] = useState<PiggyBank | null>(null)
  const [isEntry, setIsEntry] = useState(true);
  const [moneyValue, setMoneyValue] = useState('');

  const { user } = useUserStore();
  const { movimentsInPiggyBank, addMovimentInPiggyBank, getMovimentsOfPiggyBank, getPiggyBank, } = usePiggyBankStore();
  const { language } = useLanguageStore();

  const route = useRoute();


  const { piggyBankId } = route.params as RouteParams;

  async function handleAddMoviment(moviment: Moviment) {
    if (piggyBank) {
      setMoneyValue('');
      await addMovimentInPiggyBank(piggyBank, user!.Email, moviment);
      await getMovimentsOfPiggyBank(piggyBank.id!, user!.Email);
    }
  }

  useEffect(() => {
    async function fetchPiggyBank() {
      const piggyBankData = await getPiggyBank(user!.Email, piggyBankId)
      if (piggyBankData) {
        setpiggyBank(piggyBankData)
        await getMovimentsOfPiggyBank(piggyBankData.id!, user!.Email);
      }
    }
    fetchPiggyBank();
  }, [piggyBankId, user])

  if (!piggyBank) {
    return
  }

  return (
    <ScreenBackground title="Carro">
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <KeyboardAvoidingView
          style={{ flexGrow: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={150}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <Panel
              balance={piggyBank.amountValue}
              progress={piggyBank.amountValue * 100 / piggyBank.goal}
              date={piggyBank.dateGoal.toDateString()}
            />

            <TouchableOpacity
              style={styles.buttonGoal}
            >
              <Text style={styles.goal}>
                meta: {language?.CoinSymbol.Symbol} {piggyBank.goal}
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <View style={{ width: '47%' }}>
                <ButtonSubmit
                  color={MyTheme.colors.primary}
                  text="Entrada"
                  backgroundTranspatent={!isEntry}
                  onPress={() => setIsEntry(true)}
                  smallHeight
                />
              </View>
              <View style={{ width: '47%' }}>
                <ButtonSubmit
                  color={MyTheme.colors.red}
                  text="Saída"
                  backgroundTranspatent={isEntry}
                  onPress={() => setIsEntry(false)}
                  smallHeight
                />
              </View>
            </View>
            <View
              style={styles.newTransation}
            >
              <Text style={styles.valueLabel}>
                valor
              </Text>
              <Input
                leftIcon={<FontAwesome5 name="dollar-sign" size={24} color={MyTheme.colors.white} />}
                placeholder="00,00"
                keyboardType="numeric"
                onChangeText={(text) => setMoneyValue(decimalMask(text))}
                value={moneyValue}
              />
              <ButtonSubmit
                text={isEntry ? 'Guardar' : 'Retirar'}
                color={isEntry ? MyTheme.colors.primary : MyTheme.colors.red}
                disabled={moneyValue.trim() === ''}
                onPress={() => handleAddMoviment({
                  Description: piggyBank.description,
                  Date: new Date(),
                  Type: isEntry ? 'entry' : 'exit',
                  Value: Number.parseFloat(moneyValue)
                })}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <FlatList
          data={movimentsInPiggyBank}
          keyExtractor={(item) => item.Id!}
          renderItem={({ item }) => (
            <MovimentDetail Date={item.Date} Description="" Type={item.Type} Value={item.Value} Id={item.Id} />
          )}
        />
      </View>
    </ScreenBackground>
  );
}