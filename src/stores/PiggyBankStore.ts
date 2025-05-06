import { create } from "zustand";
import { PiggyBank } from "./PiggyBankType";
import { Moviment } from "./MovimentType";
import { FirebasePiggyBank } from "@/firebase/firestore/FirestorePiggyBank";

const firebasePiggyBank = new FirebasePiggyBank();

interface PiggyBankState {
  piggyBanks: PiggyBank[] | null;
  getPiggyBank: (email: string) => Promise<void>;
  newPiggyBank: (piggyBank: PiggyBank, email: string) => Promise<void>;
  getMovimentsOfPiggyBank: (PiggyBankId: string, email: string) => Promise<Moviment[]>;
  addMovimentInPiggyBank: (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => Promise<void>;
}

export const usePiggyBankStore = create<PiggyBankState>((set) => ({
  piggyBanks: null,
  getPiggyBank: async (email: string) => {
    set({
      piggyBanks: await firebasePiggyBank.piggyBanks(email),
    })
  },
  newPiggyBank: async (piggyBank: PiggyBank, email: string) => {
    try {
      await firebasePiggyBank.newPiggyBank(piggyBank, email);


    } catch (error) {
      throw error
    }
  },
  getMovimentsOfPiggyBank: async (piggyBankId: string, email: string) => {
    const moviments = await firebasePiggyBank.movimentsOfPiggyBank(piggyBankId, email);

    return moviments


  },
  addMovimentInPiggyBank: async (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => {
    await firebasePiggyBank.addMovimentInPiggyBank(piggyBank.id!, email, moviment);

    const UpdatedPigBank: PiggyBank = {
      dateGoal: piggyBank.dateGoal,
      description: piggyBank.description,
      goal: piggyBank.goal,
      id: piggyBank.id!,
      amountValue: 
    }
  },
}))