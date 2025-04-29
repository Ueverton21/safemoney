import { StyleSheet } from "react-native";
import { MyTheme } from "../Theme";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  boxBalance: {
    flexDirection: "row",
    marginTop: 60,
    width: "80%",
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  buttonEye: {
    marginLeft: 8,
  },
  balanceHidden: {
    height: 24,
    backgroundColor: MyTheme.colors.background_secondary,
    borderRadius: 2,
    width: "80%",
  },
  text: {
    color: MyTheme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: MyTheme.colors.background_secondary,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  monthly: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthlyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: MyTheme.colors.white,
  },
  boxMoviment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  movimentItem: {
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: "48%",
    borderRadius: 8,
  },
  movimentTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  boxMovimentValue: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  movimentText: {
    fontSize: 18,
  },
  centerText: {
    textAlign: "center",
  },
  titleBalanceMonth: {
    fontSize: 16,
    marginTop: 20,
    color: MyTheme.colors.white,
  },
  valueBalanceMonth: {
    fontSize: 20,
    marginTop: 4,
    fontWeight: "600",
    color: MyTheme.colors.white,
  },
  titleHistorical: {
    fontSize: 17,
    color: MyTheme.colors.secondary,
    marginTop: 10,
    marginBottom: 20,
  },
});
