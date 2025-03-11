import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { MyTheme } from "../Theme";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { Input } from "@/components/Inputs/Input";
import { useLanguageStore } from "@/stores/LanguageStore";

import { styles } from "./style";

export default function GroupDetails() {
  const [isEntry, setIsEntry] = useState(true);
  const [goal, setGoal] = useState('15000,00');
  const [moneyValue, setMoneyValue] = useState('');

  const { language } = useLanguageStore();

  const partcipants = [{ name: 'Welington', totalContribution: 1000 }, { name: 'Ueverton', totalContribution: 1500 }, { name: 'Weldys', totalContribution: 800 }, { name: 'Lourival', totalContribution: 2000 }];

  return (
    <ScreenBackground title="Carro">
      <ScrollView>
        <Panel
          balance="1500,00"
          progress={90}
          date="30/10/25"
        />

        <TouchableOpacity
          style={styles.buttonGoal}
        >
          <Text style={styles.goal}>
            {language?.GroupDetails.Goal}: {language?.CoinSymbol.Symbol} {goal}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <View style={{ width: '47%' }}>
            <ButtonSubmit
              color={MyTheme.colors.primary}
              text={language?.GroupDetails.Entry}
              backgroundTranspatent={!isEntry}
              onPress={() => setIsEntry(true)}
              smallHeight
            />
          </View>
          <View style={{ width: '47%' }}>
            <ButtonSubmit
              color={MyTheme.colors.red}
              text={language?.GroupDetails.Expense}
              backgroundTranspatent={isEntry}
              onPress={() => setIsEntry(false)}
              smallHeight
            />
          </View>
        </View>
        <View
          style={styles.newTransation}
        >
          <Text style={styles.Title}>
            {language?.GroupDetails.value}
          </Text>
          <Input
            leftIcon={<FontAwesome5 name="dollar-sign" size={24} color={MyTheme.colors.white} />}
            placeholder="00,00"
            keyboardType="numeric"
            value={moneyValue}
            setValue={setMoneyValue}
          />
          <Text style={styles.Title}>
            {language?.GroupDetails.Responsible}
          </Text>
          <Input
            placeholder={language?.GroupDetails.ParticipantsName}
            value={moneyValue}
            setValue={setMoneyValue}
          />
          <View style={{ width: '65%', alignSelf: 'center' }}>
            <ButtonSubmit
              text={isEntry ? language?.GroupDetails.ToSave : language?.GroupDetails.ToTakeOut}
              color={isEntry ? MyTheme.colors.primary : MyTheme.colors.red}
              disabled={moneyValue === ''}
              smallHeight
            />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.Title}>{language?.GroupDetails.Contributions}</Text>
          {
            partcipants.map(participant => (
              <View key={participant.name} style={styles.contributionsContainer}>
                <Text style={styles.contributionsText}>{participant.name}</Text>
                <Text style={styles.contributionsText}>{language?.CoinSymbol.Symbol} {participant.totalContribution.toFixed(2).toString().split('.').join(',')}</Text>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}