import { Keyboard, ScrollView, View } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { MyTheme } from "../Theme";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Input } from "@/components/Inputs/Input";
import { ArrowButton } from "@/components/Buttons/ArrowButton";
import { ListButton } from "@/components/Buttons/ListButton";

import { styles } from "./styles";
import { useLanguageStore } from "@/stores/LanguageStore";
import { PIGGY_BANK_DESCRIPTIONS_PT } from "@/utils/Descriptions_pt";
import Toast from "react-native-toast-message";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { useUserStore } from "@/stores/UserStore";
import { decimalMask } from "@/utils/Masks";

export default function NewLittleBox() {
  const [description, setDescription] = useState("");
  const [moneyValue, setMoneyValue] = useState("");
  const [listVisible, setListVisible] = useState(false);

  const { language } = useLanguageStore();
  const { newPiggyBank } = usePiggyBankStore();
  const { user } = useUserStore();

  async function handleNewPiggyBank() {
    if (description.trim() === "" || moneyValue.trim() === "") {
      Keyboard.dismiss();
      setTimeout(() => {
        showToastError();
      }, 500);
    } else {
      newPiggyBank(
        {
          dateGoal: new Date(),
          description: description,
          amountValue: 0,
          goal: Number.parseFloat(moneyValue),
        },
        user?.Email!
      ).then(() => {
        setDescription('');
        setMoneyValue('');
        Keyboard.dismiss();
        setTimeout(() => {
          showToastSuccess();
        }, 500);
      })
    }
  }

  function showToastSuccess() {
    Toast.show({
      type: "success",
      text1: "Adicionar",
      text2: "Movimentação adicionada",
    });
  }
  function showToastError() {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: "Preencha os campos",
    });
  }

  return (
    <ScreenBackground title={language!.NewLittleBox.Title}>
      <Toast position="bottom" bottomOffset={80} />
      <View style={styles.Container}>
        <View>
          <View style={{ position: "relative" }}>
            <Input
              leftIcon={
                <FontAwesome5
                  name="question-circle"
                  size={24}
                  color={MyTheme.colors.background_secondary}
                />
              }
              rightIcon={
                <ArrowButton
                  direction={listVisible ? "up" : "down"}
                  smallSize
                  onPress={() => setListVisible(!listVisible)}
                />
              }
              placeholder={language!.NewLittleBox.Description}
              onChangeText={setDescription}
              value={description}
            />
            {listVisible && (
              <ScrollView
                style={styles.listcontainer}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {PIGGY_BANK_DESCRIPTIONS_PT.map((item) => {
                  return <ListButton key={item.id} title={item.title} />;
                })}
              </ScrollView>
            )}
          </View>
          {!listVisible && (
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
          )}
        </View>
        <ButtonSubmit
          text={language!.NewLittleBox.Confirm}
          color={MyTheme.colors.primary}
          onPress={handleNewPiggyBank}
        />
      </View>
    </ScreenBackground>
  );
}
