export function decimalMask(value: string) {
  return value.replace(/\D/g, "").replace(/^(\d+)(\d{2})$/, "$1,$2");
  //.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
