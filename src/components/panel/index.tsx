import { Text, Touchable, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { MyTheme } from "@/screens/Theme";

import { styles } from "./styles";
import { useState } from "react";
import { useLanguageStore } from "@/stores/LanguageStore";
import { AlertConfirm } from "../Alerts/AlertConfirm";

type PanelProps = TouchableOpacityProps & {
  name?: string;
  progress: number;
  balance: number;
  handleRemove?: () => Promise<void>;
}
export function Panel({ name, progress, balance, handleRemove, ...rest }: PanelProps) {
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);


  const { language } = useLanguageStore();


  function closeAlertFirst() {
    if (handleRemove) {
      setIsVisibleDelete(false);
      handleRemove();
    }
  }

  return (
    <>
      {
        name ? (
          <>
            <AlertConfirm
              isVisible={isVisibleDelete}
              onConfirm={() => closeAlertFirst()}
              onCancel={() => setIsVisibleDelete(false)}
              text="Deseja excluir essa caixinha?"
              title="Excluir"
              textButtons={{ confirm: "Sim", cancel: "Não" }}
            />
            <TouchableOpacity
              onLongPress={() => setIsVisibleDelete(true)}
              style={styles.container}
              {...rest}>
              <View style={styles.row}>
                <FontAwesome6 name="credit-card" size={16} color={MyTheme.colors.white} />
                <Text style={styles.name}>
                  {name}
                </Text>
                <Text style={styles.balance}>
                  {language?.CoinSymbol.Symbol} {balance.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>

              <View style={styles.progressContainer}>
                <View style={[styles.progress, { width: `${progress}%` }]} />
              </View>
            </TouchableOpacity>
          </>
        )
          : (
            <View
              style={styles.container}
              {...rest}>
              <View style={styles.row}>
                <FontAwesome6 name="credit-card" size={16} color={MyTheme.colors.white} />
                <Text style={styles.name}>
                  {name}
                </Text>
                <Text style={styles.balance}>
                  {language?.CoinSymbol.Symbol} {balance.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>

              <View style={styles.progressContainer}>
                <View style={[styles.progress, { width: `${progress}%` }]} />
              </View>
            </View>
          )
      }
    </>
  )
}