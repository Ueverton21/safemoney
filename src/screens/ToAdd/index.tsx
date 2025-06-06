import {
  ScrollView,
  View,
  ToastAndroid,
  Keyboard,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Toast from "react-native-toast-message";

import { MyTheme } from "../Theme";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Input } from "@/components/Inputs/Input";

import { styles } from "./styles";
import { useMovimentStore } from "@/stores/MovimentStore";
import { useUserStore } from "@/stores/UserStore";
import { decimalMask } from "@/utils/Masks";
import { Check } from "@/components/Check/Check";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function ToAdd() {
  const [isEntry, setIsEntry] = useState(true);
  const [description, setDescription] = useState("");
  const [moneyValue, setMoneyValue] = useState("");
  const [isFixed, setIsFixed] = useState(false);

  const { addMoviment, addExitFixedMoviment, loadExitBalance } =
    useMovimentStore();
  const { user } = useUserStore();
  const { language } = useLanguageStore();

  /*Chamar a função para puxar o balanço fixo de saídas do mês atual,
  assim evita problemas do usuário ao adicionar despesa fixa dê algum
  conflito com meses antetiores 
  */
  async function loadExitMonthActualy() {
    const emailStorage = await AsyncStorage.getItem("@email");
    var date = new Date();
    var monthSelect = date.getMonth();
    var yearSelect = date.getFullYear();
    await loadExitBalance(emailStorage!, monthSelect + 1, yearSelect);
  }

  async function handleAddMoviment() {
    await loadExitMonthActualy();
    if (description === "" || moneyValue === "") {
      Keyboard.dismiss();
      setTimeout(() => {
        showToastError();
      }, 500);
    } else {
      if (isFixed) {
        addExitFixedMoviment(
          {
            Description: description,
            Value: Number.parseFloat(moneyValue),
          },
          user?.Email!
        ).then(() => {
          Keyboard.dismiss();
          setTimeout(() => {
            showToastSuccess();
          }, 500);
          setDescription("");
          setMoneyValue("");
        });
      } else {
        var valuePoint =
          moneyValue.split(",")[0] + "." + moneyValue.split(",")[1];

        addMoviment(
          {
            Date: new Date(),
            Description: description,
            Value: Number.parseFloat(valuePoint),
            Type: isEntry ? "entry" : "exit",
          },
          user?.Email!
        ).then(() => {
          Keyboard.dismiss();
          setTimeout(() => {
            showToastSuccess();
          }, 500);
          setDescription("");
          setMoneyValue("");
        });
      }
    }
  }
  function showToastSuccess() {
    Platform.OS === "ios"
      ? Toast.show({
        type: "success",
        text1: language!.ToAdd.Add,
        text2: language!.ToAdd.TransactionAdded,
      })
      : ToastAndroid.show(language!.ToAdd.TransactionAdded, ToastAndroid.SHORT);
  }
  function showToastError() {
    Platform.OS === "ios"
      ? Toast.show({
        type: "error",
        text1: language!.ToAdd.Add,
        text2: language!.ToAdd.FillFields,
      })
      : ToastAndroid.show(language!.ToAdd.FillFields, ToastAndroid.SHORT);
  }

  return (
    <ScreenBackground title={language!.ToAdd.Title}>
      <Toast position="bottom" />
      <View style={styles.buttonContainer}>
        <View style={{ width: "47%" }}>
          <ButtonSubmit
            color={MyTheme.colors.primary}
            text="Entrada"
            backgroundTranspatent={!isEntry}
            onPress={() => setIsEntry(true)}
          />
        </View>
        <View style={{ width: "47%" }}>
          <ButtonSubmit
            color={MyTheme.colors.red}
            text="Saída"
            backgroundTranspatent={isEntry}
            onPress={() => setIsEntry(false)}
          />
        </View>
      </View>

      <View style={styles.movementContainer}>
        <Input
          leftIcon={
            <FontAwesome5
              name="dollar-sign"
              size={24}
              color={MyTheme.colors.white}
            />
          }
          placeholder="00,00"
          keyboardType="numeric"
          onChangeText={(text) => setMoneyValue(decimalMask(text))}
          value={moneyValue}
        />
        <View style={{ position: "relative" }}>
          <Input
            value={description}
            leftIcon={
              <FontAwesome5
                name="question-circle"
                size={24}
                color={MyTheme.colors.background_secondary}
              />
            }
            placeholder={language!.ToAdd.Description}
            onChangeText={setDescription}
          />
        </View>
        {!isEntry && (
          <>
            <TouchableOpacity onPress={() => setIsFixed(!isFixed)}>
              <Check
                selectedColor={MyTheme.colors.primary}
                isSelected={isFixed}
                text={language!.ToAdd.FixedExpense}
              />
            </TouchableOpacity>
            <View style={{ marginBottom: 16 }} />
          </>
        )}

        <ButtonSubmit
          color={MyTheme.colors.primary}
          text={language!.ToAdd.Add}
          onPress={handleAddMoviment}
        />
      </View>
    </ScreenBackground>
  );
}
