import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
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
import Toast from "react-native-toast-message";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { useUserStore } from "@/stores/UserStore";
import { dateMask, decimalMask } from "@/utils/Masks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackList } from "@/routes/AppStacks";
import { VariantIconName } from "@/components/Icons";
import { parseDateString } from "@/utils/parseDateString";

type StackScreenNavigationProp = NativeStackNavigationProp<RootStackList, "NewLittleBox">;


export default function NewLittleBox() {
  const [description, setDescription] = useState("");
  const [moneyValue, setMoneyValue] = useState("");
  const [dateGoal, setDateGoal] = useState("");
  const [listVisible, setListVisible] = useState(false);

  const { language } = useLanguageStore();
  const { newPiggyBank } = usePiggyBankStore();
  const { user } = useUserStore();

  const navigation = useNavigation<StackScreenNavigationProp>();

  const icons: VariantIconName[] = [
    'credit-card'
    , 'car-side'
    , 'piggy-bank'
    , 'plane-departure'
    , 'house-chimney'
    , 'briefcase-medical'
    , 'book'
    , 'mobile-screen-button'
    , 'hourglass-half'
    , 'cart-shopping'
    , 'map-location'
  ];

  async function handleNewPiggyBank() {
    if (description.trim() === "" || moneyValue.trim() === "") {
      Keyboard.dismiss();
      showToastError();
    } else {
      if (parseDateString(dateGoal)) {
        newPiggyBank(
          {
            dateGoal: parseDateString(dateGoal)!,
            description: description,
            amountValue: 0,
            goal: Number.parseFloat(moneyValue),
          },
          user?.Email!
        ).then(() => {
          setDescription('');
          setMoneyValue('');
          Keyboard.dismiss();
          showToastSuccess();
          return new Promise(res => setTimeout(res, 2000));

        }).then(() =>
          navigation.navigate('Tabs')
        )
      }
    }
  }

  function showToastSuccess() {
    Toast.show({
      type: "success",
      text1: "Criar",
      text2: "Caixinha criada",
      visibilityTime: 1500,
    });
  }
  function showToastError() {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: "Preencha os campos",
      visibilityTime: 1500,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenBackground title={language!.NewLittleBox.Title}>
        <Toast position="bottom" bottomOffset={120} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={styles.Container}
        >
          <ScrollView keyboardShouldPersistTaps='handled'>
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
                  <View
                    style={styles.listcontainer}
                  >
                    {icons.map((item, index) => {
                      return <ListButton key={index} icon={item} />;
                    })}
                  </View>
                )}
              </View>
              {!listVisible && (
                <>
                  <Text style={styles.goalValueLabel}>
                    meta
                  </Text>
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
                  <Text style={styles.goalValueLabel}>
                    até quando?
                  </Text>
                  <Input
                    placeholder="00/00/0000"
                    keyboardType="numeric"
                    onChangeText={(text) => setDateGoal(dateMask(text))}
                    value={dateGoal}
                  />
                </>
              )}
            </View>
          </ScrollView>

          <ButtonSubmit
            text={language!.NewLittleBox.Confirm}
            color={MyTheme.colors.primary}
            onPress={handleNewPiggyBank}
          />
        </KeyboardAvoidingView>
      </ScreenBackground>
    </TouchableWithoutFeedback>
  );
}
