import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { MyTheme } from "@/screens/Theme";

import { styles } from "./styles";
import { useState } from "react";
import { useLanguageStore } from "@/stores/LanguageStore";
import { AlertConfirm } from "../Alerts/AlertConfirm";
import { Progress } from "../Progress";

type PanelProps = TouchableOpacityProps & {
  name?: string;
  progress: number;
  balance: number;
  visibleBalance?: boolean;
  handleRemove?: () => Promise<void>;
}
export function Panel({ name, progress, balance, visibleBalance = true, handleRemove, ...rest }: PanelProps) {
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
              text={language!.Components.RemovePiggyBank}
              title={language!.Components.Remove}
              textButtons={{ confirm: language!.Components.Yes, cancel: language!.Components.No }}
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
                {
                  visibleBalance ? (
                    <Text style={styles.balance}>
                      {language!.CoinSymbol.Symbol} {balance.toLocaleString(language!.Name === 'en' ? 'en-US' : 'pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  ) : (
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <View style={styles.balanceHidden} />
                    </View>
                  )
                }
              </View>
            </TouchableOpacity>
          </>
        )
          : (
            <View style={styles.container}>
              <View style={styles.row}>
                <FontAwesome6 name="credit-card" size={16} color={MyTheme.colors.white} />
                <Text style={styles.name}>
                  {name}
                </Text>
                <Text style={styles.balance}>
                  {language?.CoinSymbol.Symbol} {balance.toLocaleString(language!.Name === 'en' ? 'en-US' : 'pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>

            </View>
          )
      }
      <Progress progress={progress} />
    </>
  )
}