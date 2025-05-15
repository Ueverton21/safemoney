import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { MyTheme } from "../Theme";
import { MyPicker } from "@/components/Picker/MyPicker";
import { useLanguageStore } from "@/stores/LanguageStore";
import { useUserStore } from "@/stores/UserStore";
import { useMovimentStore } from "@/stores/MovimentStore";
import { getTotalEntries, getTotalExits } from "@/utils/CalculatorMoviments";
import { addDigitZeroByMonth } from "@/firebase/firestore/FirestoreMoviment";
import { MovimentDetail } from "@/components/Details/MovimentDetail";
import { Moviment } from "@/stores/MovimentType";

export default function Home() {
  const [visibleBalance, setVisibleBalance] = useState(false);
  const { language } = useLanguageStore();

  var date = new Date();

  const [month, setMonth] = useState(
    addDigitZeroByMonth(date.getMonth() + 1) + "-" + date.getFullYear()
  );
  const { user } = useUserStore();
  const { moviments, months, getMovimentsByMonth, removeMoviment } = useMovimentStore();

  function handleSelectMonth(monthSelect: string) {
    var monthInt = Number.parseInt(monthSelect.split("-")[0]);
    var yearSelect = Number.parseInt(monthSelect.split("-")[1]);

    getMovimentsByMonth(user?.Email!, monthInt, yearSelect);
  }

  async function handleRemove(moviment: Moviment) {
    var month = moviment.Date.getMonth() + 1;
    var year = moviment.Date.getFullYear();

    await removeMoviment(user!.Email, month, year, moviment.Id!);
  }

  const entriesSum =
    moviments && moviments.length > 0
      ? getTotalEntries(moviments).toFixed(2)
      : "0.00";
  const exitsSum =
    moviments && moviments.length > 0
      ? getTotalExits(moviments).toFixed(2)
      : "0.00";

  return (
    <View style={styles.main}>
      {moviments == null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={MyTheme.colors.white} size={"large"} />
        </View>
      ) : (
        <>
          <View style={styles.boxBalance}>
            {visibleBalance ? (
              <Text style={styles.text}>
                {language?.Home.Balance}: {user?.Balance?.toFixed(2)} R$
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
              list={months?.map((item) => {
                var monthInt = Number.parseInt(item.split("-")[0]);
                var yearSelect = item.split("-")[1];
                return {
                  name:
                    language?.Home.Monthly.find(
                      (val, index) => index == monthInt - 1
                    )?.Name +
                    ", " +
                    yearSelect,
                  value: item,
                };
              })}
              onValueChange={(val) => {
                setMonth(months?.find((month) => month === val)!);
                handleSelectMonth(months?.find((month) => month === val)!);
              }}
            >
              <View style={styles.monthly}>
                <Text style={styles.monthlyText}>
                  {language?.Home.Monthly.find(
                    (val, index) =>
                      index == Number.parseInt(month.split("-")[0]) - 1
                  )?.Name +
                    ", " +
                    month.split("-")[1]}
                </Text>
                <Feather
                  name="chevron-down"
                  size={24}
                  color={MyTheme.colors.white}
                />
              </View>
            </MyPicker>
            <View style={styles.boxMoviment}>
              <View
                style={[
                  styles.movimentItem,
                  { borderColor: MyTheme.colors.primary },
                ]}
              >
                <Text
                  style={[
                    styles.movimentTitle,
                    { color: MyTheme.colors.primary },
                  ]}
                >
                  Entradas
                </Text>
                <View style={styles.boxMovimentValue}>
                  <Text
                    style={[
                      styles.movimentText,
                      { color: MyTheme.colors.primary },
                    ]}
                  >
                    R$ {entriesSum}
                  </Text>
                  <Feather
                    name="arrow-up-circle"
                    size={24}
                    color={MyTheme.colors.primary}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.movimentItem,
                  { borderColor: MyTheme.colors.red },
                ]}
              >
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
                    R${exitsSum}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.centerText, styles.titleBalanceMonth]}>
              Saldo do mês
            </Text>
            <Text style={[styles.centerText, styles.valueBalanceMonth]}>
              R${" "}
              {(
                Number.parseFloat(entriesSum) - Number.parseFloat(exitsSum)
              ).toFixed(2)}
            </Text>
            <Text style={styles.titleHistorical}>
              Histórico de movimentação
            </Text>
            <ScrollView>
              {moviments?.map((item) => {
                return (
                  <MovimentDetail
                    moviment={item}
                    handleRemove={() => handleRemove(item)}
                    key={item.Id!}
                  />
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}
