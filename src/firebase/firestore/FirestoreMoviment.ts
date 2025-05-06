import { Moviment } from "@/stores/MovimentType";
import { firebaseApp } from "../config";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { updateBalance, UpdateUser } from "./FirestoreUser";

import { useUserStore } from "@/stores/UserStore";
import { User } from "@/stores/UserType";

export class FirebaseMoviment {
  async movimentsByMonth(
    email: string,
    month: number,
    year: number
  ): Promise<Array<Moviment>> {
    const db = getFirestore(firebaseApp);

    try {
      const monthYear = `${addDigitZeroByMonth(month)}-${year}`;

      const collec = collection(
        db,
        "users",
        email,
        "movimentMonth",
        monthYear,
        "moviments"
      );
      const q = query(collec, orderBy("Date", "desc"));

      const moviments = await getDocs(q);

      if (moviments.docs.length > 0) {
        var listMoviments = new Array<Moviment>();
        moviments.forEach((moviment) => {
          listMoviments.push(mapToMoviment(moviment.data(), moviment.id));
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
  async addMovimentFirestore(
    moviment: Moviment,
    email: string
  ): Promise<Moviment> {
    const db = getFirestore(firebaseApp);

    const monthYear = `${addDigitZeroByMonth(
      moviment.Date.getMonth() + 1
    )}-${moviment.Date.getFullYear()}`;

    //Garantir que o mês, exemplo: 04-2025 seja listado como docs
    await setDoc(
      doc(db, "users", email, "movimentMonth", monthYear),
      {
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    const docMovimentsRef = doc(
      collection(db, "users", email, "movimentMonth", monthYear, "moviments")
    );

    try {
      await setDoc(docMovimentsRef, moviment);

      await updateBalance(moviment);

      const { user, updateUser } = useUserStore.getState();

      const balanceUpdate =
        moviment.Type == "entry"
          ? user!.Balance + moviment.Value
          : user!.Balance - moviment.Value;

      moviment.Id = docMovimentsRef.id;

      const newUser: User = {
        Name: user?.Name!,
        Balance: balanceUpdate,
        CreatedAt: user?.CreatedAt!,
        Email: user?.Email!,
        LastName: user?.LastName!,
      };
      //Firebase
      await UpdateUser(newUser, email);
      //Zustand
      updateUser(newUser);

      return moviment;
    } catch (error) {
      throw error;
    }
  }
  async getMonths(email: string): Promise<Array<string>> {
    const db = getFirestore(firebaseApp);

    try {
      const collec = collection(db, "users", email, "movimentMonth");
      const months = await getDocs(collec);
      console.log(months.docs.length);
      if (months.docs.length > 0) {
        var listMonths = new Array<string>();
        months.forEach((month) => {
          listMonths.push(month.id);
        });

        return listMonths;
      } else {
        return new Array<string>();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async removeMoviment(email: string, month: number, year: number, id: string) {
    const db = getFirestore(firebaseApp);

    const monthYear = `${addDigitZeroByMonth(month)}-${year}`;
    try {
      const docMoviment = doc(
        db,
        "users",
        email,
        "movimentMonth",
        monthYear,
        "moviments",
        id
      );

      await deleteDoc(docMoviment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

function mapToMoviment(data: any, id: string): Moviment {
  return {
    Date: data.Date.toDate(),
    Description: data.Description,
    Type: data.Type,
    Value: data.Value,
    Id: id,
  };
}

export function addDigitZeroByMonth(month: number): string {
  if (month < 10) {
    return `0${month}`;
  }
  return month.toString();
}
