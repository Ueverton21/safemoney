export type Moviment = {
  Id?: string;
  Date: Date;
  Description: string;
  Type: "entry" | "exit";
  Value: number;
};
