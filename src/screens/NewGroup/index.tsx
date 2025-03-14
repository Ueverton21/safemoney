import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { MyTheme } from "../Theme";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Input } from "@/components/Inputs/Input";
import { ArrowButton } from "@/components/Buttons/ArrowButton";
import { ListButton } from "@/components/Buttons/ListButton";
import { LITTLE_BOX_DESCRIPTION } from "@/utils/Descriptions";

import { styles } from "./styles";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function NewGroup() {
  const [description, setDescription] = useState("");
  const [moneyValue, setMoneyValue] = useState("");
  const [listVisible, setListVisible] = useState(false);

  const { language } = useLanguageStore();

  return (
    <ScreenBackground title={language!.NewGroup.Title}>
      <View style={styles.Container}>
        <View>
          <View style={{ position: 'relative' }}>
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
                  direction={listVisible ? "up" : 'down'}
                  smallSize onPress={() => setListVisible(!listVisible)}
                />
              }
              placeholder={language?.NewGroup.Description}
              setValue={setDescription}
            />
            {
              listVisible && (
                <ScrollView
                  style={styles.listcontainer}
                  contentContainerStyle={{ paddingVertical: 10 }}
                >
                  {
                    LITTLE_BOX_DESCRIPTION.map((item) => {
                      return (
                        <ListButton key={item.id} title={item.title} />
                      )
                    })
                  }
                </ScrollView>
              )
            }
          </View>
          {
            !listVisible &&
            <Input
              leftIcon={<FontAwesome5 name="dollar-sign" size={24} color={MyTheme.colors.white} />}
              placeholder="00,00"
              keyboardType="numeric"
              setValue={setMoneyValue}
            />
          }
        </View>
        <ButtonSubmit text={language?.NewGroup.Confirm} color={MyTheme.colors.primary} />
      </View>

    </ScreenBackground>
  );
}
