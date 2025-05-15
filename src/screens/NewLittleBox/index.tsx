import { Keyboard, ScrollView, Text, View } from "react-native";
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
import { decimalMask } from "@/utils/Masks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackList } from "@/routes/AppStacks";
import { VariantIconName } from "@/components/Icons";

type StackScreenNavigationProp = NativeStackNavigationProp<RootStackList, "NewLittleBox">;


export default function NewLittleBox() {
  const [description, setDescription] = useState("");
  const [moneyValue, setMoneyValue] = useState("");
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
        showToastSuccess();
        return new Promise(res => setTimeout(res, 2000));

      }).then(() =>
        navigation.navigate('Tabs')
      )
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
    <ScreenBackground title={language!.NewLittleBox.Title}>
      <Toast position="bottom" bottomOffset={100} />
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
                {icons.map((item, index) => {
                  return <ListButton key={index} icon={item} />;
                })}
              </ScrollView>
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
            </>
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
