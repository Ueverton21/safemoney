import { addDigitZeroByNumber } from "@/firebase/firestore/FirestoreMoviment";

const MINUTE = 60000;
export function dateToText(date: Date): string {
  var dateNow = new Date();

  var dateSimple =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  var dateNowSimple =
    dateNow.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    dateNow.getFullYear();
  var diff = dateNow.getTime() - date.getTime();
  if (diff < MINUTE) {
    return "Há alguns segundos";
  } else if (diff < MINUTE * 60) {
    return "Há alguns minutos";
  } else if (dateSimple === dateNowSimple) {
    return "Hoje";
  } else {
    var dayNumber = Number.parseInt(dateSimple.split("/")[0]);
    var monthNumber = Number.parseInt(dateSimple.split("/")[1]);
    var day = addDigitZeroByNumber(dayNumber);
    var month = addDigitZeroByNumber(monthNumber);

    return `${day}/${month}/${dateSimple.split("/")[2]}`;
  }
}
