import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
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
      setEditDateGoalField(piggyBankData.dateGoal.toLocaleDateString(language!.Name === 'en' ? 'en-US' : 'pt-BR', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }))
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
    if (piggyBank) {
      if (parseFloat(editGoalField) - piggyBank.amountValue < 0) {
        return showToastError('above-goal')
      }
      Keyboard.dismiss();
      setButtonToastIsVisible(false);
      setIsLoading(true);
      const updatedPiggyBank: PiggyBank = {
        id: piggyBank.id,
        amountValue: piggyBank.amountValue,
        dateGoal: parseDateString(editDateGoalField, language!.Name)!,
        description: editTitleField,
        goal: parseFloat(editGoalField)
      }
      await editPiggyBank(updatedPiggyBank, user!.Email);
      fetchPiggyBank();
      setIsLoading(false);
    }
  }

  function showToastError(error: 'below-zero' | 'above-goal') {
    Platform.OS === "ios"
      ? Toast.show({
        type: "error",
        text1: language!.LittleBoxDetails.Error,
        text2:
          error === 'above-goal'
            ? language!.LittleBoxDetails.ExceedGoal
            : error === "below-zero"
              ? language!.LittleBoxDetails.BelowZero
              : "algo deu errado",
        visibilityTime: 2000,
      }) : ToastAndroid.show(
        error === 'above-goal'
          ? language!.LittleBoxDetails.ExceedGoal
          : error === "below-zero"
            ? language!.LittleBoxDetails.BelowZero
            : "algo deu errado",
        ToastAndroid.SHORT
      )
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
                      style={[styles.buttonGoal, { minWidth: language!.Name === 'es' ? '53%' : language!.Name === 'en' ? '61%' : '63%' }]}
                    >
                      <Text style={styles.labelText}>
                        {language!.LittleBoxDetails.Goal}: {language!.CoinSymbol.Symbol}
                      </Text>
                      <TextInput
                        onFocus={() => setButtonToastIsVisible(true)}
                        onBlur={() => setButtonToastIsVisible(false)}
                        style={styles.editInput}
                        value={parseFloat(editGoalField) === piggyBank.goal ? parseFloat(editGoalField).toLocaleString(language!.Name === 'en' ? 'en-US' : 'pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }) : editGoalField}
                        onChangeText={(text) => setEditGoalField(decimalMask(text))}
                      />
                    </View>
                    <View
                      style={[styles.buttonGoal, { width: language!.Name === 'es' ? '47%' : language!.Name === 'en' ? '39%' : '37%' }]}
                    >
                      <Text style={styles.labelText}>
                        {language!.LittleBoxDetails.Until}:
                      </Text>
                      <TextInput
                        onFocus={() => setButtonToastIsVisible(true)}
                        onBlur={() => setButtonToastIsVisible(false)}
                        style={styles.editInput}
                        value={editDateGoalField}
                        onChangeText={(text) => setEditDateGoalField(dateMask(text, language!.Name))}
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
                    placeholder={language!.Name === 'en' ? "00.00" : "00,00"}
                    keyboardType="numeric"
                    onChangeText={(text) => setMoneyValue(decimalMask(text))}
                    value={moneyValue}
                  />
                  <ButtonSubmit
                    text={isEntry ? language!.LittleBoxDetails.ToSave : language!.LittleBoxDetails.ToTakeOut}
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
                    obj.Description = obj.Date.toLocaleDateString(language!.Name === 'en' ? 'en-US' : language!.Name === 'pt' ? 'pt-BR' : 'es-ES', { weekday: 'long' }).toString()
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
                          {language!.LittleBoxDetails.ListEmpty}
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