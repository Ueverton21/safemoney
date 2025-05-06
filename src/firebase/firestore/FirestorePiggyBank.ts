import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { firebaseApp } from "../config";
import { PiggyBank } from "@/stores/PiggyBankType";
import { Moviment } from "@/stores/MovimentType";

export class FirebasePiggyBank {
  async piggyBanks(email: string): Promise<PiggyBank[]> {
    const db = getFirestore(firebaseApp);
    try {
      const collec = collection(
        db,
        "users",
        email,
        "piggyBanks"
      );

      const piggyBanks = await getDocs(collec);

      if (piggyBanks.docs.length > 0) {
        var listPiggyBank = new Array<PiggyBank>();
        piggyBanks.forEach((piggyBank) => {
          listPiggyBank.push(mapToPiggyBank(piggyBank.data(), piggyBank.id));
        });

        return listPiggyBank;
      } else {
        return new Array<PiggyBank>();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async newPiggyBank(
    piggyBank: PiggyBank,
    email: string
  ): Promise<PiggyBank> {
    const db = getFirestore(firebaseApp);

    // Garante que o subdocumento 'piggyBanks' do usuário exista
    await setDoc(
      doc(db, "users", email),
      {
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    try {
      const piggyBankRef = await addDoc(
        collection(db, "users", email, "piggyBanks"),
        piggyBank
      );


      piggyBank.id = piggyBankRef.id;


      return piggyBank;
    } catch (error) {
      throw error;
    }
  }
  async movimentsOfPiggyBank(email: string, piggyBankId: string): Promise<Moviment[]> {

    const db = getFirestore(firebaseApp);

    try {
      const collec = collection(
        db,
        "users",
        email,
        "piggyBanks",
        piggyBankId,
        "moviments"
      );

      const movimentsOfPiggyBank = await getDocs(collec);

      if (movimentsOfPiggyBank.docs.length > 0) {
        var listMoviments = new Array<Moviment>();
        movimentsOfPiggyBank.forEach((item) => {
          listMoviments.push(mapToMovimentsOfPiggyBank(item.data(), item.id));
        });

        return listMoviments;
      } else {
        return new Array<Moviment>();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addMovimentInPiggyBank(
    piggyBankId: string,
    email: string,
    moviment: Moviment
  ): Promise<Moviment> {
    const db = getFirestore(firebaseApp);

    const MovimentRef = await addDoc(
      collection(db, "users", email, "piggyBanks", piggyBankId, "moviments"),
      moviment
    );

    moviment.Id = MovimentRef.id


    return moviment
  }

  async updatePiggyBank(piggyBank: PiggyBank, email: string) {
    const db = getFirestore(firebaseApp);

    const PiggyBankRef = doc(db, "users", email, "piggyBanks", piggyBank.id!);

    await updateDoc(PiggyBankRef, piggyBank);
    console.log('funcionou')
  }

}

function mapToPiggyBank(data: any, id: string): PiggyBank {
  return {
    dateGoal: data.dateGoal.toDate(),
    description: data.description,
    amountValue: data.amountValue,
    goal: data.goal,
    id: id,
  }
}

function mapToMovimentsOfPiggyBank(data: any, id: string): Moviment {
  return {
    Date: data.Date.toDate(),
    Description: data.Description,
    Type: data.Type,
    Value: data.Value,
    Id: id
  }
}