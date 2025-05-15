export type Moviment = {
  Id?: string;
  Date: Date;
  Description: string;
  Type: "entry" | "exit";
  Value: number;
};

export type ExitMoviment = {
  Id?: string;
  Description: string;
  Value: number;
};

export type MonthType = {
  updatedAt: Date;
  fixedExitBalance: number;
};
