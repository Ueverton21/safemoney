import { User } from "@/stores/UserType";
import { firebaseApp } from "../config";
import {
  setDoc,
  doc,
  getFirestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Moviment } from "@/stores/MovimentType";
import { useUserStore } from "@/stores/UserStore";

export async function ToAddUser(
  name: string,
  lastName: string,
  email: string
): Promise<void> {
  const db = getFirestore(firebaseApp);

  try {
    const docRef = doc(db, "users", email);

    const user: User = {
      Balance: 0,
      Name: name,
      Email: email,
      LastName: lastName,
      CreatedAt: new Date(),
    };
    await setDoc(docRef, user);
  } catch (error) {
    throw error;
  }
}
export async function UpdateUser(user: User, email: string): Promise<void> {
  const db = getFirestore(firebaseApp);

  try {
    const docRef = doc(db, "users", email);

    await updateDoc(docRef, user);
    console.log("SUCESSO - UPDATE");
  } catch (error) {
    throw error;
  }
}

export async function getUserFirestore(email: string): Promise<User | null> {
  const db = getFirestore(firebaseApp);

  try {
    const docRef = doc(db, "users", email);
    const user = await getDoc(docRef);

    if (user.exists()) {
      return mapToUser(user.data());
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function updateBalance(moviment: Moviment) {
  const db = getFirestore(firebaseApp);
  const { user } = useUserStore.getState();
  console.log(user);
  try {
    const docRef = doc(db, "users", user!.Email);

    const balanceUpdate =
      moviment.Type == "entry"
        ? user!.Balance + moviment.Value
        : user!.Balance - moviment.Value;

    const userUpdate: User = {
      Balance: balanceUpdate,
      Name: user!.Name,
      Email: user!.Email,
      LastName: user!.LastName,
      CreatedAt: user?.CreatedAt ? user?.CreatedAt : new Date(),
    };

    await setDoc(docRef, userUpdate, { merge: true });

    return moviment;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function mapToUser(data: any): User {
  return {
    Balance: data.Balance,
    Name: data.Name,
    Email: data.Email,
    LastName: data.LastName,
    CreatedAt: data.CreatedAt,
  };
}
