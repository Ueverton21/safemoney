export type MovimentType = {
  Date: Date;
  Description: string;
  Type: "entry" | "exit";
  Value: number;
};
