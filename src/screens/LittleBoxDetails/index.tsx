import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Panel } from "@/components/panel";
import { use, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";
import { MyTheme } from "../Theme";
import { Input } from "@/components/Inputs/Input";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useUserStore } from "@/stores/UserStore";
import { usePiggyBankStore } from "@/stores/PiggyBankStore";
import { PiggyBank } from "@/stores/PiggyBankType";
import { useRoute } from "@react-navigation/native";
import { useLanguageStore } from "@/stores/LanguageStore";
import { decimalMask } from "@/utils/Masks";
import { Moviment } from "@/stores/MovimentType";

type RouteParams = {
  piggyBank: PiggyBank;
}

export default function LittleBoxDetails() {
  const [moviments, setMoviments] = useState<Moviment[]>([]);
  const [isEntry, setIsEntry] = useState(true);
  const [moneyValue, setMoneyValue] = useState('');

  const { user } = useUserStore();
  const { addMovimentInPiggyBank, getMovimentsOfPiggyBank } = usePiggyBankStore();
  const { language } = useLanguageStore();

  const route = useRoute();

  const { piggyBank } = route.params as RouteParams;

  async function handleAddMoviment(moviment: Moviment) {
    await addMovimentInPiggyBank(piggyBank.id!, user!.Email, moviment);
    setMoviments(await getMovimentsOfPiggyBank(piggyBank.id!, user!.Email));
  }

  return (
    <ScreenBackground title="Carro">
      <View>
        <Panel
          balance={piggyBank.amountValue}
          progress={piggyBank.amountValue * 100 / piggyBank.goal}
          date={piggyBank.dateGoal.toDateString()}
        />

        <TouchableOpacity
          style={styles.buttonGoal}
        >
          <Text style={styles.goal}>
            meta: {language?.CoinSymbol.Symbol} {piggyBank.goal}
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
        <FlatList
          data={moviments}
          keyExtractor={(item) => item.Id!}
          renderItem={({ item }) => (
            <Text style={[{ color: item.Type === 'entry' ? MyTheme.colors.primary : MyTheme.colors.red }]}>
              R$ {item.Value} - {item.Date.toDateString()}
            </Text>
          )}
        />
      </View>
    </ScreenBackground>
  );
}