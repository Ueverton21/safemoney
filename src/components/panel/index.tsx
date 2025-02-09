import { ReactNode } from "react";
import { Text, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

type PanelProps = TouchableOpacityProps & {
  children: ReactNode;
  name: string;
  progress: number;
  balance: string;
}
export function Panel({ children, name, progress, balance }: PanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.name}>
          {name}
        </Text>
        {children}
      </View>

      <Text style={styles.balance}>
        R$ {balance}
      </Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  )
}