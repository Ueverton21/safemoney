import { firebaseApp } from "../config";
import { setDoc, doc, getFirestore } from "firebase/firestore";

export async function ToAddUser(
  name: string,
  lastName: string,
  email: string
): Promise<void> {
  const db = getFirestore(firebaseApp);

  try {
    const docRef = doc(db, "users", email);

    await setDoc(docRef, {
      Email: email,
      LastName: lastName,
      Name: name,
    });
    console.log("SUCESSO");
  } catch (error) {
    throw error;
  }
}
