import { ExitMoviment, MonthType, Moviment } from "@/stores/MovimentTypes";
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
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { updateBalance, UpdateUser } from "./FirestoreUser";

import { useUserStore } from "@/stores/UserStore";
import { User } from "@/stores/UserType";
import { useMovimentStore } from "@/stores/MovimentStore";

export class FirebaseMoviment {
  async movimentsByMonth(
    email: string,
    month: number,
    year: number
  ): Promise<Array<Moviment>> {
    const db = getFirestore(firebaseApp);

    try {
      const monthYear = `${addDigitZeroByNumber(month)}-${year}`;

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
  async getExitMoviments(email: string): Promise<Array<ExitMoviment>> {
    const db = getFirestore(firebaseApp);

    try {
      const collec = collection(db, "users", email, "exitsFixed");
      const q = query(collec, orderBy("Description", "asc"));

      const exitMoviments = await getDocs(q);

      if (exitMoviments.docs.length > 0) {
        var listMoviments = new Array<ExitMoviment>();
        exitMoviments.forEach((moviment) => {
          listMoviments.push(mapToExitMoviment(moviment.data(), moviment.id));
        });

        return listMoviments;
      } else {
        return new Array<ExitMoviment>();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getExitBalanceByMonth(
    email: string,
    month: number,
    year: number
  ): Promise<MonthType | null> {
    const db = getFirestore(firebaseApp);

    try {
      const monthYear = `${addDigitZeroByNumber(month)}-${year}`;

      const docMonth = doc(db, "users", email, "movimentMonth", monthYear);

      const monthSelected = await getDoc(docMonth);
      if (monthSelected.exists()) {
        return mapToMonth(monthSelected.data());
      } else {
        return null;
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
    console.log("VER");
    const monthYear = `${addDigitZeroByNumber(
      moviment.Date.getMonth() + 1
    )}-${moviment.Date.getFullYear()}`;

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
      console.log(moviment.Value.toFixed(2));
      await setDoc(docMovimentsRef, moviment);

      await updateBalance(moviment.Value, moviment.Type);

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

  async addExitFixedFirestore(
    moviment: ExitMoviment,
    email: string
  ): Promise<ExitMoviment> {
    const db = getFirestore(firebaseApp);

    const docMovimentsRef = doc(collection(db, "users", email, "exitsFixed"));

    try {
      await setDoc(docMovimentsRef, moviment);

      await updateBalance(moviment.Value, "exit");

      const { user, updateUser } = useUserStore.getState();

      const balanceUpdate = user!.Balance - moviment.Value;

      moviment.Id = docMovimentsRef.id;

      const newUser: User = {
        Name: user?.Name!,
        Balance: balanceUpdate,
        CreatedAt: user?.CreatedAt!,
        Email: user?.Email!,
        LastName: user?.LastName!,
      };
      //Atualizar user
      //Firebase
      await UpdateUser(newUser, email);
      //Zustand
      updateUser(newUser);

      //Atualizar valor das saídas fixas
      const { exitBalanceByMonth, setExitBalanceByMonth } =
        useMovimentStore.getState();

      var newExitBalanceByMonth: MonthType = {
        fixedExitBalance: exitBalanceByMonth?.fixedExitBalance!
          ? exitBalanceByMonth?.fixedExitBalance! - moviment.Value
          : 0 - moviment.Value,
        updatedAt: new Date(),
      };
      //Firebase
      updateExitBalance(newExitBalanceByMonth, email);

      //Store
      setExitBalanceByMonth(newExitBalanceByMonth);

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

    const monthYear = `${addDigitZeroByNumber(month)}-${year}`;
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
  async removeExitMoviment(email: string, id: string) {
    const db = getFirestore(firebaseApp);

    try {
      const docMoviment = doc(db, "users", email, "exitsFixed", id);

      await deleteDoc(docMoviment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export async function updateExitBalance(
  exitBalance: MonthType,
  email: string
): Promise<void> {
  const db = getFirestore(firebaseApp);

  try {
    var date = new Date();
    var month =
      addDigitZeroByNumber(date.getMonth() + 1) + "-" + date.getFullYear();

    const docRef = doc(db, "users", email, "movimentMonth", month);

    await updateDoc(docRef, exitBalance);
    console.log("SUCESSO - UPDATE - BALANCE MONTH");
  } catch (error) {
    throw error;
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
function mapToExitMoviment(data: any, id: string): ExitMoviment {
  return {
    Description: data.Description,
    Value: data.Value,
    Id: id,
  };
}
function mapToMonth(data: any): MonthType {
  return {
    fixedExitBalance: data.fixedExitBalance,
    updatedAt: data.updatedAt.toDate(),
  };
}

export function addDigitZeroByNumber(value: number): string {
  if (value < 10) {
    return `0${value}`;
  }
  return value.toString();
}
