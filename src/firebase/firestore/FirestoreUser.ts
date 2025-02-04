import { User } from "@/stores/UserType";
import { firebaseApp } from "../config";
import { setDoc, doc, getFirestore, getDoc } from "firebase/firestore";

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
    console.log("SUCESSO");
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

function mapToUser(data: any): User {
  return {
    Balance: data.Balance,
    Name: data.Name,
    Email: data.Email,
    LastName: data.LastName,
    CreatedAt: data.CreatedAt,
  };
}
