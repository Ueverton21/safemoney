import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "../Theme";
import { MyPicker } from "@/components/Picker/MyPicker";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useUserStore } from "@/stores/UserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [visibleBalance, setVisibleBalance] = useState(false);
  const { language } = useLanguageStore();

  const [month, setMonth] = useState(new Date().getMonth());
  const { user } = useUserStore();

  return (
    <View style={styles.main}>
      <View style={styles.boxBalance}>
        {visibleBalance ? (
          <Text style={styles.text}>
            {language?.Home.Balance}: {user?.Balance!.toFixed(2)} R$
          </Text>
        ) : (
          <View style={styles.balanceHidden}></View>
        )}

        <TouchableOpacity
          style={styles.buttonEye}
          onPress={() => setVisibleBalance(!visibleBalance)}
        >
          <Feather
            name={visibleBalance ? "eye-off" : "eye"}
            size={20}
            color={MyTheme.colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <MyPicker
          list={language?.Home.Monthly.map((item) => {
            return { name: item.Name + ", 25", value: item.Acronym };
          })}
          onValueChange={(val) =>
            setMonth(
              language?.Home.Monthly.findIndex(
                (month) => month.Acronym === val
              )!
            )
          }
        >
          <View style={styles.monthly}>
            <Text style={styles.monthlyText}>
              {language?.Home.Monthly[month].Name + ", 25"}
            </Text>
            <Feather
              name="chevron-down"
              size={24}
              color={MyTheme.colors.white}
            />
          </View>
        </MyPicker>
        <View style={styles.boxMoviment}>
          <View style={styles.movimentItem}>
            <Text
              style={[styles.movimentTitle, { color: MyTheme.colors.primary }]}
            >
              Entradas
            </Text>
            <View style={styles.boxMovimentValue}>
              <Text
                style={[styles.movimentText, { color: MyTheme.colors.primary }]}
              >
                R$ 2700,00
              </Text>
              <Feather
                name="arrow-up-circle"
                size={24}
                color={MyTheme.colors.primary}
              />
            </View>
          </View>
          <View style={styles.movimentItem}>
            <Text
              style={[
                styles.movimentTitle,
                { color: MyTheme.colors.red, textAlign: "right" },
              ]}
            >
              Despesas
            </Text>
            <View style={styles.boxMovimentValue}>
              <Feather
                name="arrow-down-circle"
                size={24}
                color={MyTheme.colors.red}
              />
              <Text
                style={[styles.movimentText, { color: MyTheme.colors.red }]}
              >
                R$ 2700,00
              </Text>
            </View>
          </View>
        </View>
        <Text style={[styles.centerText, styles.titleBalanceMonth]}>
          Saldo do mês
        </Text>
        <Text style={[styles.centerText, styles.valueBalanceMonth]}>
          R$ 1500,25
        </Text>
        <Text style={styles.titleHistorical}>Histórico de movimentação</Text>
        <Text style={styles.textEntry}>-100,00 R$ - Conta de água</Text>
        <Text style={styles.textExit}>+600,00 R$ - Venda do Celular</Text>
      </View>
    </View>
  );
}
