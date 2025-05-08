import { create } from "zustand";
import { PiggyBank } from "./PiggyBankType";
import { Moviment } from "./MovimentType";
import { FirebasePiggyBank } from "@/firebase/firestore/FirestorePiggyBank";

const firebasePiggyBank = new FirebasePiggyBank();

interface PiggyBankState {
  piggyBanks: PiggyBank[] | null;
  movimentsInPiggyBank: Moviment[] | null;
  getPiggyBanks: (email: string) => void;
  getPiggyBank: (email: string, piggyBankId: string) => Promise<PiggyBank | undefined>;
  newPiggyBank: (piggyBank: PiggyBank, email: string) => Promise<void>;
  getMovimentsOfPiggyBank: (PiggyBankId: string, email: string) => Promise<void>;
  addMovimentInPiggyBank: (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => Promise<void>;
}

export const usePiggyBankStore = create<PiggyBankState>((set) => ({
  piggyBanks: null,
  movimentsInPiggyBank: null,
  getPiggyBanks: async (email: string) => {
    set({
      piggyBanks: await firebasePiggyBank.piggyBanks(email)
    })
  },

  getPiggyBank: async (email: string, piggyBankId: string) => {
    const piggyBankData = await firebasePiggyBank.getPiggyBank(email, piggyBankId)
    console.log(piggyBankData)
    return piggyBankData;
  },

  newPiggyBank: async (piggyBank: PiggyBank, email: string) => {
    try {
      await firebasePiggyBank.newPiggyBank(piggyBank, email);

      set({
        piggyBanks: await firebasePiggyBank.piggyBanks(email),
      })
    } catch (error) {
      throw error
    }
  },

  getMovimentsOfPiggyBank: async (email: string, piggyBankId: string) => {
    const moviments = await firebasePiggyBank.movimentsOfPiggyBank(piggyBankId, email);
    set({
      movimentsInPiggyBank: moviments
    })
  },

  addMovimentInPiggyBank: async (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => {
    await firebasePiggyBank.addMovimentInPiggyBank(piggyBank.id!, email, moviment);
    console.log('chegou aqui')

    const amountValueUpdate =
      moviment?.Type == "entry"
        ? piggyBank!.amountValue + moviment.Value
        : piggyBank!.amountValue - moviment!.Value;

    const UpdatedPigBank: PiggyBank = {
      dateGoal: piggyBank.dateGoal,
      description: piggyBank.description,
      goal: piggyBank.goal,
      id: piggyBank.id!,
      amountValue: amountValueUpdate
    };
    await firebasePiggyBank.updatePiggyBank(UpdatedPigBank, email);

    set({
      piggyBanks: await firebasePiggyBank.piggyBanks(email),
    })
  },
}))