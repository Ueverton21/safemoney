import { create } from "zustand";
import { Moviment, MonthType, ExitMoviment } from "./MovimentTypes";
import {
  addDigitZeroByNumber,
  FirebaseMoviment,
  updateExitBalance,
} from "@/firebase/firestore/FirestoreMoviment";
const firebaseMoviment = new FirebaseMoviment();
import { useUserStore } from "./UserStore";
import { User } from "./UserType";
import { UpdateUser } from "@/firebase/firestore/FirestoreUser";

interface MovimentState {
  moviments: Array<Moviment> | null;
  exitMoviments: Array<ExitMoviment> | null;
  exitBalanceByMonth: MonthType | null;
  setExitBalanceByMonth: (month: MonthType) => void;
  months: Array<string> | null;
  getMovimentsByMonth: (
    email: string,
    month: number,
    year: number
  ) => Promise<void>;
  loadExitBalance: (
    email: string,
    month: number,
    year: number
  ) => Promise<void>;
  getExitMoviments: (email: string) => Promise<void>;
  addMoviment: (moviment: Moviment, email: string) => Promise<void>;
  addExitFixedMoviment: (
    moviment: ExitMoviment,
    email: string
  ) => Promise<void>;
  removeMoviment: (
    email: string,
    month: number,
    year: number,
    id: string
  ) => Promise<void>;
  removeExitMoviment: (email: string, id: string) => Promise<void>;
}

export const useMovimentStore = create<MovimentState>()((set) => ({
  exitMoviments: null,
  exitBalanceByMonth: null,
  moviments: null,
  months: null,
  getMovimentsByMonth: async (email: string, month: number, year: number) => {
    set({
      moviments: await firebaseMoviment.movimentsByMonth(email, month, year),
      months: await firebaseMoviment.getMonths(email),
      exitBalanceByMonth: await firebaseMoviment.getExitBalanceByMonth(
        email,
        month,
        year
      ),
    });
  },
  loadExitBalance: async (email: string, month: number, year: number) => {
    set({
      exitBalanceByMonth: await firebaseMoviment.getExitBalanceByMonth(
        email,
        month,
        year
      ),
    });
  },
  addMoviment: async (moviment: Moviment, email: string) => {
    try {
      await firebaseMoviment.addMovimentFirestore(moviment, email);

      var date = new Date();
      var month =
        addDigitZeroByNumber(date.getMonth() + 1) + "-" + date.getFullYear();

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
  addExitFixedMoviment: async (moviment: ExitMoviment, email: string) => {
    try {
      var mov = await firebaseMoviment.addExitFixedFirestore(moviment, email);

      set((state) => {
        var newMoviments = [moviment, ...state.exitMoviments!];
        return { exitMoviments: newMoviments };
      });
    } catch (error) {
      throw error;
    }
  },
  removeMoviment: async (
    email: string,
    month: number,
    year: number,
    id: string
  ) => {
    try {
      await firebaseMoviment.removeMoviment(email, month, year, id);
      const { user, updateUser } = useUserStore.getState();

      set((state) => {
        var moviment = state.moviments?.find((mov) => mov.Id === id);
        const balanceUpdate =
          moviment?.Type == "entry"
            ? user!.Balance - moviment.Value
            : user!.Balance + moviment!.Value;

        const newUser: User = {
          Name: user?.Name!,
          Balance: balanceUpdate,
          CreatedAt: user?.CreatedAt!,
          Email: user?.Email!,
          LastName: user?.LastName!,
        };
        //Firebase
        UpdateUser(newUser, email);
        //Zustand
        updateUser(newUser);
        var newMoviments = state.moviments?.filter((mov) => {
          return mov.Id !== id;
        });
        return { moviments: newMoviments };
      });
    } catch (error) {
      throw error;
    }
  },
  removeExitMoviment: async (email: string, id: string) => {
    try {
      await firebaseMoviment.removeExitMoviment(email, id);
      const { user, updateUser } = useUserStore.getState();

      set((state) => {
        var moviment = state.exitMoviments?.find((mov) => mov.Id === id);
        const balanceUpdate = user!.Balance + moviment!.Value;

        const newUser: User = {
          Name: user?.Name!,
          Balance: balanceUpdate,
          CreatedAt: user?.CreatedAt!,
          Email: user?.Email!,
          LastName: user?.LastName!,
        };
        //Firebase
        UpdateUser(newUser, email);
        //Zustand
        updateUser(newUser);
        var newMoviments = state.exitMoviments?.filter((mov) => {
          return mov.Id !== id;
        });
        var newExitBalanceByMonth: MonthType = {
          fixedExitBalance:
            state.exitBalanceByMonth?.fixedExitBalance! + moviment?.Value!,
          updatedAt: new Date(),
        };
        //Atualizar fixedBalance firebase
        updateExitBalance(newExitBalanceByMonth, email);
        return {
          exitMoviments: newMoviments,
          exitBalanceByMonth: newExitBalanceByMonth,
        };
      });
    } catch (error) {
      throw error;
    }
  },
  setExitBalanceByMonth: (month: MonthType) => {
    set({ exitBalanceByMonth: month });
  },
  getExitMoviments: async (email: string) => {
    set({ exitMoviments: await firebaseMoviment.getExitMoviments(email) });
  },
}));
