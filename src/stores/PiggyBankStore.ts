import { create } from "zustand";
import { PiggyBank } from "./PiggyBankType";
import { Moviment } from "./MovimentTypes";
import { FirebasePiggyBank } from "@/firebase/firestore/FirestorePiggyBank";

const firebasePiggyBank = new FirebasePiggyBank();

interface PiggyBankState {
  piggyBanks: PiggyBank[] | null;
  movimentsInPiggyBank: Moviment[] | null;
  getPiggyBanks: (email: string) => void;
  getPiggyBank: (email: string, piggyBankId: string) => Promise<PiggyBank | undefined>;
  newPiggyBank: (piggyBank: PiggyBank, email: string) => Promise<void>;
  removePiggyBank: (PiggyBankId: string, email: string) => Promise<void>;
  editPiggyBank: (piggyBankUpdated: PiggyBank, email: string) => Promise<void>;
  getMovimentsOfPiggyBank: (PiggyBankId: string, email: string) => Promise<void>;
  addMovimentInPiggyBank: (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => Promise<void>;
  removeMovimentInPiggyBank: (
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
    const piggyBankFind = (
      await firebasePiggyBank.piggyBanks(email))
      .find(item => item.id === piggyBankId)
    return piggyBankFind
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

  editPiggyBank: async (piggyBankUpdated: PiggyBank, email: string) => {
    await firebasePiggyBank.updatePiggyBank(piggyBankUpdated, email)

    set({
      piggyBanks: await firebasePiggyBank.piggyBanks(email),
    })
  },

  removePiggyBank: async (piggyBankId: string, email: string) => {
    try {
      await firebasePiggyBank.removePiggyBank(piggyBankId, email)
    } catch (error) {
      throw error
    }
  },

  getMovimentsOfPiggyBank: async (email: string, piggyBankId: string) => {
    const moviments = await firebasePiggyBank.movimentsOfPiggyBank(piggyBankId, email);
    const orgMoviments = moviments.sort((a, b) => b.Date.getTime() - a.Date.getTime());
    set({
      movimentsInPiggyBank: orgMoviments
    })
  },

  addMovimentInPiggyBank: async (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => {
    await firebasePiggyBank.addMovimentInPiggyBank(piggyBank.id!, email, moviment);

    const amountValueUpdate =
      moviment?.Type == "entry"
        ? piggyBank!.amountValue + moviment.Value
        : piggyBank!.amountValue - moviment!.Value;

    const UpdatedPigBank: PiggyBank = {
      dateGoal: piggyBank.dateGoal,
      description: piggyBank.description,
      goal: piggyBank.goal,
      id: piggyBank.id,
      amountValue: amountValueUpdate
    };

    await firebasePiggyBank.updatePiggyBank(UpdatedPigBank, email);

    set({
      piggyBanks: await firebasePiggyBank.piggyBanks(email),
    })
  },
  removeMovimentInPiggyBank: async (
    piggyBank: PiggyBank,
    email: string,
    moviment: Moviment
  ) => {
    await firebasePiggyBank.removeMovimentInPiggyBank(piggyBank.id!, email, moviment.Id!);
    const amountValueUpdate =
      moviment?.Type == "entry"
        ? piggyBank!.amountValue - moviment.Value
        : piggyBank!.amountValue + moviment!.Value;

    const UpdatedPigBank: PiggyBank = {
      dateGoal: piggyBank.dateGoal,
      description: piggyBank.description,
      goal: piggyBank.goal,
      id: piggyBank.id,
      amountValue: amountValueUpdate
    };

    await firebasePiggyBank.updatePiggyBank(UpdatedPigBank, email);

    set({
      piggyBanks: await firebasePiggyBank.piggyBanks(email),
    })
  },
}));