const MINUTE = 60000;
export function dateToText(date: Date): string {
  var dateNow = new Date();

  var dateSimple =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  var dateNowSimple =
    dateNow.getDate() + "/" + dateNow.getMonth() + "/" + dateNow.getFullYear();
  var diff = dateNow.getTime() - date.getTime();
  if (diff < MINUTE) {
    return "Há alguns segundos";
  } else if (diff < MINUTE * 60) {
    return "Há alguns minutos";
  } else if (dateSimple === dateNowSimple) {
    return "Hoje";
  } else {
    return dateSimple;
  }
}
