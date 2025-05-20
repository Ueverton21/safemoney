import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useRoute } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { MyTheme } from "../Theme";
import { dateMask, decimalMask } from "@/utils/Masks";
import { useLanguageStore } from "@/stores/LanguageStore";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { useUserStore } from "@/stores/UserStore";
import { Moviment } from "@/stores/MovimentTypes";
import { PiggyBank } from "@/stores/PiggyBankType";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Input } from "@/components/Inputs/Input";
import { MovimentDetail } from "@/components/Details/MovimentDetail";
import { ButtonToast } from "@/components/Buttons/ButtonToast";

import { styles } from "./style";
import { parseDateString } from "@/utils/parseDateString";
import { Loading } from "@/components/Loading";
import Toast, { ErrorToast } from "react-native-toast-message";

type RouteParams = {
  piggyBankId: string;
}

export default function LittleBoxDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [piggyBank, setpiggyBank] = useState<PiggyBank | null>(null);

  const [editGoalField, setEditGoalField] = useState('');
  const [editDateGoalField, setEditDateGoalField] = useState('');
  const [editTitleField, setEditTitleField] = useState('');

  const [isEntry, setIsEntry] = useState(true);
  const [moneyValue, setMoneyValue] = useState('');
  const [movimentsLoaded, setMovimentsLoaded] = useState(false);

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
      setEditDateGoalField(piggyBankData.dateGoal.toLocaleDateString())
      setEditTitleField(piggyBankData.description);
      await getMovimentsOfPiggyBank(piggyBankData.id!, user!.Email);
      setMovimentsLoaded(true);
    }
  }

  async function handleAddMoviment(moviment: Moviment) {
    Keyboard.dismiss();
    if (piggyBank) {
      if (moviment.Type === 'entry' && piggyBank.amountValue + moviment.Value > piggyBank.goal) {
        return showToastError('above-goal')
      }
      if (moviment.Type === 'exit' && piggyBank.amountValue - moviment.Value < 0) {
        return showToastError('below-zero')
      }
      setMoneyValue('');
      setMovimentsLoaded(false);
      await addMovimentInPiggyBank(piggyBank, user!.Email, moviment);
      await getMovimentsOfPiggyBank(piggyBank.id!, user!.Email);
      setMovimentsLoaded(true);
    }
    await fetchPiggyBank();

  }

  async function handleRemoveMoviment(moviment: Moviment) {
    if (piggyBank) {
      if (moviment.Type === 'entry' && piggyBank.amountValue - moviment.Value < 0) {
        return showToastError('below-zero')
      }
      if (moviment.Type === 'exit' && piggyBank.amountValue + moviment.Value > piggyBank.goal) {
        return showToastError('above-goal')
      }
      setMovimentsLoaded(false);
      await removeMovimentInPiggyBank(piggyBank, user!.Email, moviment);
      await getMovimentsOfPiggyBank(piggyBank.id!, user!.Email);
      setMovimentsLoaded(true);
    }
    await fetchPiggyBank();
  }

  async function handleEditPiggyBank() {
    Keyboard.dismiss();
    setButtonToastIsVisible(false);
    if (piggyBank) {
      setIsLoading(true);
      const updatedPiggyBank: PiggyBank = {
        id: piggyBank.id,
        amountValue: piggyBank.amountValue,
        dateGoal: parseDateString(editDateGoalField)!,
        description: editTitleField,
        goal: parseFloat(editGoalField)
      }
      await editPiggyBank(updatedPiggyBank, user!.Email);
      fetchPiggyBank();
      setIsLoading(false);
    }
  }

  function showToastError(error: 'below-zero' | 'above-goal') {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2:
        error === 'above-goal'
          ? "altere sua meta para guardar mais dineiro"
          : error === "below-zero"
            ? "não é possível que seu saldo fique negativo"
            : "algo deu errado",
      visibilityTime: 1500,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchPiggyBank();
    setIsLoading(false);
  }, [piggyBankId, user])

  if (!piggyBank) {
    return <Loading />
  }

  return (
    <ScreenBackground
      title={editTitleField}
      editName
      onChangeText={setEditTitleField}
      onFocus={() => setButtonToastIsVisible(true)}
      onBlur={() => setButtonToastIsVisible(false)}
    >
      <Toast
        position="bottom"
        bottomOffset={120}
      />
      {
        !isLoading ? (
          <View style={{ flex: 1, paddingBottom: 20 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={140}
            >
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}} keyboardShouldPersistTaps="handled">
                <Panel
                  balance={piggyBank.amountValue}
                  progress={piggyBank.amountValue * 100 / piggyBank.goal}
                />
                <TouchableWithoutFeedback>
                  <View style={styles.row}>
                    <View
                      style={styles.buttonGoal}
                    >
                      <Text style={styles.labelText}>
                        meta: {language?.CoinSymbol.Symbol}
                      </Text>
                      <TextInput
                        onFocus={() => setButtonToastIsVisible(true)}
                        onBlur={() => setButtonToastIsVisible(false)}
                        style={styles.editInput}
                        value={parseFloat(editGoalField) === piggyBank.goal ? parseFloat(editGoalField).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }) : editGoalField}
                        onChangeText={(text) => setEditGoalField(decimalMask(text))}
                      />
                    </View>
                    <View
                      style={styles.buttonDateGoal}
                    >
                      <Text style={styles.labelText}>
                        até:
                      </Text>
                      <TextInput
                        onFocus={() => setButtonToastIsVisible(true)}
                        onBlur={() => setButtonToastIsVisible(false)}
                        style={styles.editInput}
                        value={editDateGoalField}
                        onChangeText={(text) => setEditDateGoalField(dateMask(text))}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
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
            {
              movimentsLoaded ? (
                <FlatList
                  data={movimentsInPiggyBank ?? []}
                  keyExtractor={(item) => item.Id!}
                  renderItem={({ item }) => {
                    var obj = item;
                    obj.Description = obj.Date.toLocaleDateString('pt-BR', { weekday: 'long' }).toString()
                    return <MovimentDetail
                      moviment={obj}
                      handleRemove={() => handleRemoveMoviment(item)}
                    />
                  }}
                  contentContainerStyle={{
                    flexGrow: 1
                  }}
                  ListEmptyComponent={() => {
                    return (
                      <View style={styles.listMovimentsEmptyContainer}>
                        <Text style={styles.listMovimentsEmptyText}>
                          Guarde dinheiro em sua caixinha para bater sua meta
                        </Text>
                      </View>
                    )
                  }}
                />
              ) : (
                <Loading />
              )
            }
          </View>
        ) : (
          <Loading />
        )
      }
    </ScreenBackground >
  );
}