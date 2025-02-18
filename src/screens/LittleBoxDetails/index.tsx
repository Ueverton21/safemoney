import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { MyTheme } from "../Theme";
import { Input } from "@/components/Inputs/Input";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

export default function LittleBoxDetails() {
  const [isEntry, setIsEntry] = useState(true);
  const [goal, setGoal] = useState('15000,00');
  const [moneyValue, setMoneyValue] = useState('');

  const historyTransations = [{ value: 100.50, date: '20/02/2025', isEntry: false }, { value: 500.00, date: '21/02/2025', isEntry: true }, { value: 700.75, date: '22/02/2025', isEntry: true }, { value: 100.50, date: '20/02/2025', isEntry: false }, { value: 500.00, date: '21/02/2025', isEntry: true }, { value: 700.75, date: '22/02/2025', isEntry: true }, { value: 100.50, date: '20/02/2025', isEntry: false }, { value: 500.00, date: '21/02/2025', isEntry: true }, { value: 700.75, date: '22/02/2025', isEntry: true }];

  return (
    <ScreenBackground title="Carro">
      <View>
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
          <Text style={styles.valueLabel}>
            valor
          </Text>
          <Input
            leftIcon={<FontAwesome5 name="dollar-sign" size={24} color={MyTheme.colors.white} />}
            placeholder="00,00"
            keyboardType="numeric"
            value={moneyValue}
            setValue={setMoneyValue}
          />
          <ButtonSubmit
            text={isEntry ? 'Guardar' : 'Retirar'}
            color={isEntry ? MyTheme.colors.primary : MyTheme.colors.red}
            disabled={moneyValue === ''}
          />
        </View>
        <FlatList
          data={historyTransations}
          keyExtractor={(item, index) => String(item.date) + index}
          renderItem={({ item }) => (
            <Text style={[{ color: item.isEntry ? MyTheme.colors.primary : MyTheme.colors.red }]}>
              R$ {item.value} - {item.date}
            </Text>
          )}
        />
      </View>
    </ScreenBackground>
  );
}