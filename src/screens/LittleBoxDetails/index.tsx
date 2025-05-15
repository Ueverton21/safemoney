import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { use, useEffect, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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
import { ButtonToast } from "@/components/Buttons/ButtonToast";

type RouteParams = {
  piggyBankId: string;
}

export default function LittleBoxDetails() {
  const [piggyBank, setpiggyBank] = useState<PiggyBank | null>(null)
  const [editGoalField, setEditGoalField] = useState('');
  const [isEntry, setIsEntry] = useState(true);
  const [moneyValue, setMoneyValue] = useState('');

  const [buttonToastIsVisible, setButtonToastIsVisible] = useState(false);

  const { user } = useUserStore();
  const {
    movimentsInPiggyBank,
    addMovimentInPiggyBank,
    getMovimentsOfPiggyBank,
    getPiggyBank,
    removeMovimentInPiggyBank,
    editPiggyBank,
  } = usePiggyBankStore();
  const { language } = useLanguageStore();

  const route = useRoute();


  const { piggyBankId } = route.params as RouteParams;

  async function fetchPiggyBank() {
    const piggyBankData = await getPiggyBank(user!.Email, piggyBankId)
    if (piggyBankData) {
      setpiggyBank(piggyBankData)
      setEditGoalField(piggyBankData.goal.toString())
      await getMovimentsOfPiggyBank(piggyBankData.id!, user!.Email);
    }
  }

  async function handleAddMoviment(moviment: Moviment) {
    if (piggyBank) {
      if (moviment.Type === 'entry' && piggyBank.amountValue + moviment.Value > piggyBank.goal) {
        return console.log('altere sua meta para guardar mais dineiro')
      }
      if (moviment.Type === 'exit' && piggyBank.amountValue - moviment.Value < 0) {
        return console.log('você está tirando mais do que guardou')
      }
      setMoneyValue('');
      await addMovimentInPiggyBank(piggyBank, user!.Email, moviment);
      await getMovimentsOfPiggyBank(piggyBank.id!, user!.Email);
    }
    await fetchPiggyBank();
  }

  async function handleRemoveMoviment(moviment: Moviment) {
    if (piggyBank) {
      if (moviment.Type === 'entry' && piggyBank.amountValue - moviment.Value < 0) {
        return console.log('não é possível que seu saldo fique negativo')
      }
      if (moviment.Type === 'exit' && piggyBank.amountValue + moviment.Value > piggyBank.goal) {
        return console.log('aumente sua meta para que seu saldo possa ser maior')
      }
      await removeMovimentInPiggyBank(piggyBank, user!.Email, moviment);
      await getMovimentsOfPiggyBank(piggyBank.id!, user!.Email);
    }
    await fetchPiggyBank();
  }

  async function handleEditPiggyBank() {
    Keyboard.dismiss();
    setButtonToastIsVisible(false);
    if (piggyBank) {
      const updatedPiggyBank: PiggyBank = {
        id: piggyBank.id,
        amountValue: piggyBank.amountValue,
        dateGoal: piggyBank.dateGoal,
        description: piggyBank.description,
        goal: parseFloat(editGoalField)
      }
      fetchPiggyBank();
      await editPiggyBank(updatedPiggyBank, user!.Email)
    }
  }

  useEffect(() => {
    fetchPiggyBank();
  }, [piggyBankId, user])

  if (!piggyBank) {
    return
  }

  return (
    <ScreenBackground title={piggyBank.description}>

      <View style={{ flex: 1, paddingBottom: 20 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={140}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}} keyboardShouldPersistTaps="handled">
            <Panel
              balance={piggyBank.amountValue}
              progress={piggyBank.amountValue * 100 / piggyBank.goal}
              date={piggyBank.dateGoal.toDateString()}
            />

            <View
              style={styles.buttonGoal}
            >
              <Text style={styles.goalText}>
                meta: {language?.CoinSymbol.Symbol}
              </Text>
              <TouchableWithoutFeedback>
                <TextInput
                  onFocus={() => setButtonToastIsVisible(true)}
                  onBlur={() => setButtonToastIsVisible(false)}
                  style={styles.goalInput}
                  value={parseFloat(editGoalField) === piggyBank.goal ? parseFloat(editGoalField).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) : editGoalField}
                  onChangeText={(text) => setEditGoalField(decimalMask(text))}
                />
              </TouchableWithoutFeedback>
            </View>
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
          <ButtonToast action={buttonToastIsVisible ? 'open' : 'close'} confirm={handleEditPiggyBank} />
        </KeyboardAvoidingView>
        <FlatList
          data={movimentsInPiggyBank}
          keyExtractor={(item) => item.Id!}
          renderItem={({ item }) => {
            var obj = item;
            obj.Description = obj.Date.toLocaleDateString('pt-BR', { weekday: 'long' }).toString()
            return <MovimentDetail
              moviment={obj}
              handleRemove={() => handleRemoveMoviment(item)}
            />
          }}
        />
      </View>
    </ScreenBackground >
  );
}