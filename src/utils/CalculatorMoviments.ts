import { Moviment } from "@/stores/MovimentTypes";

export function getTotalEntries(moviments: Array<Moviment>): Number {
  var sum = 0;
  moviments.map((item) => {
    if (item.Type == "entry") {
      sum += item.Value;
    }
  });

  return sum;
}

export function getTotalExits(moviments: Array<Moviment>): number {
  var sum = 0;
  moviments.map((item) => {
    if (item.Type == "exit") {
      sum += item.Value;
    }
  });
  return sum;
}
