import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { MyTheme } from "../Theme";
import { Input } from "@/components/Inputs/Input";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

export default function GroupDetails() {
  const [isEntry, setIsEntry] = useState(true);
  const [goal, setGoal] = useState('15000,00');
  const [moneyValue, setMoneyValue] = useState('');

  const historyTransations = [{ value: 100.50, date: '20/02/2025', isEntry: false }, { value: 500.00, date: '21/02/2025', isEntry: true }, { value: 700.75, date: '22/02/2025', isEntry: true }, { value: 1000.50, date: '23/02/2025', isEntry: false }, { value: 500.00, date: '25/02/2025', isEntry: true }, { value: 700.75, date: '29/02/2025', isEntry: true }, { value: 150.50, date: '20/02/2025', isEntry: false }, { value: 1000000.00, date: '21/02/2025', isEntry: true }, { value: 700.75, date: '27/02/2025', isEntry: true }];
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
            meta: R$ {goal}
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
          <Text style={styles.Title}>
            valor
          </Text>
          <Input
            leftIcon={<FontAwesome5 name="dollar-sign" size={24} color={MyTheme.colors.white} />}
            placeholder="00,00"
            keyboardType="numeric"
            value={moneyValue}
            setValue={setMoneyValue}
          />
          <Text style={styles.Title}>
            responsável
          </Text>
          <Input
            placeholder="nome do participante"
            value={moneyValue}
            setValue={setMoneyValue}
          />
          <View style={{ width: '65%', alignSelf: 'center' }}>
            <ButtonSubmit
              text={isEntry ? 'Guardar' : 'Retirar'}
              color={isEntry ? MyTheme.colors.primary : MyTheme.colors.red}
              disabled={moneyValue === ''}
              smallHeight
            />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.Title}>Contribuições</Text>
          {
            partcipants.map(participant => (
              <View key={participant.name} style={styles.contributionsContainer}>
                <Text style={styles.contributionsText}>{participant.name}</Text>
                <Text style={styles.contributionsText}>R$ {participant.totalContribution.toFixed(2).toString().split('.').join(',')}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.historyContainer}>
          {
            historyTransations.map((item) => {
              return (
                <Text key={`${item.value}` + item.date} style={[{ color: item.isEntry ? MyTheme.colors.primary : MyTheme.colors.red }]}>
                  R$ {item.value} - {item.date}
                </Text>
              )
            })
          }
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}