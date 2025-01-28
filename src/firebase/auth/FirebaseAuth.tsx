import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "../config";

export async function userIsAuthenticated(): Promise<boolean> {
  const auth = getAuth(); // Obtenha o auth do Firebase

  // Retorna uma Promise, porque onAuthStateChanged é assíncrono
  return new Promise<boolean>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    // Lembre-se de limpar o listener após o uso
    return unsubscribe;
  });
}
export async function authenticate(
  email: string,
  password: string
): Promise<User | undefined> {
  const auth = getAuth(firebaseApp);

  try {
    var userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return undefined;
  }
}
