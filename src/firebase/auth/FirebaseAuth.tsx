import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseApp } from "../config";

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
