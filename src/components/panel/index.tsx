import { Text, Touchable, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { MyTheme } from "@/screens/Theme";

import { styles } from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

type PanelProps = TouchableOpacityProps & {
  name?: string;
  progress: number;
  balance: string;
  date?: string;
}
export function Panel({ name, progress, balance, date, ...rest }: PanelProps) {
  const [buttonDateSelected, setButtonDateSelected] = useState(false);

  return (
    <>
      {
        date ? (
          <View style={styles.container}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonDate}
                onPress={() => setButtonDateSelected(!buttonDateSelected)}
                {...rest}>
                <Text style={styles.date}>
                  até: {date}
                </Text>
                <FontAwesome5
                  name={buttonDateSelected ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <FontAwesome6 name="credit-card" size={35} color={MyTheme.colors.white} />
            </View>

            <Text style={styles.balance}>
              R$ {balance}
            </Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.row}>
              <Text style={styles.name}>
                {name}
              </Text>
              <FontAwesome6 name="credit-card" size={24} color={MyTheme.colors.white} />
            </View>

            <Text style={styles.balance}>
              R$ {balance}
            </Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>
          </TouchableOpacity>
        )
      }
    </>
  )
}