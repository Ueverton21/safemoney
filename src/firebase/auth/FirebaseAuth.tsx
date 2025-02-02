import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
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
    return unsubscribe;
  });
}
export async function authenticate(
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth(firebaseApp);

  try {
    var userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function createUser(
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth(firebaseApp);

  try {
    var userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  const auth = getAuth(firebaseApp);

  auth
    .signOut()
    .then(() => {
      console.log("Deslogado");
    })
    .catch((error) => {
      console.log("Error no logout");
    });
}
