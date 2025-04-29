export type Moviment = {
  Date: Date;
  Description: string;
  Type: "entry" | "exit";
  Value: number;
};
