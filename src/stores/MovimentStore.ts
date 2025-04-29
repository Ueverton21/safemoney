import { create } from "zustand";
import { Moviment } from "./MovimentType";
import {
  addDigitZeroByMonth,
  FirebaseMoviment,
} from "@/firebase/firestore/FirestoreMoviment";
const firebaseMoviment = new FirebaseMoviment();

interface MovimentState {
  moviments: Array<Moviment> | null;
  months: Array<string> | null;
  getMovimentsByMonth: (
    email: string,
    month: number,
    year: number
  ) => Promise<void>;
  addMoviment: (moviment: Moviment, email: string) => Promise<void>;
}

export const useMovimentStore = create<MovimentState>()((set) => ({
  moviments: null,
  months: null,
  getMovimentsByMonth: async (email: string, month: number, year: number) => {
    set({
      moviments: await firebaseMoviment.movimentsByMonth(email, month, year),
      months: await firebaseMoviment.getMonths(email),
    });
  },
  addMoviment: async (moviment: Moviment, email: string) => {
    try {
      await firebaseMoviment.addMovimentFirestore(moviment, email);

      var date = new Date();
      var month =
        addDigitZeroByMonth(date.getMonth() + 1) + "-" + date.getFullYear();

      set((state) => {
        var newMonths: Array<string> = state.months!;
        //Verificar se é a primeira movimentação do mês corrente.
        if (!state.months?.includes(month)) {
          newMonths = [...state.months!, month];
        }
        var newMoviments = [moviment, ...state.moviments!];
        return { moviments: newMoviments, months: newMonths };
      });
    } catch (error) {
      throw error;
    }
  },
}));
