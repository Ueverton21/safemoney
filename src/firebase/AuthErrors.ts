import { Language } from "@/translate/language";

export class AuthErrors {
  parseError(language: Language, code: string): string {
    switch (code) {
      case "auth/invalid-email":
        return language?.AuthErrors.InvalidEmail!;
      case "auth/invalid-login-credentials":
        return language?.AuthErrors.InvalidCredentials!;
      default:
        return code;
    }
  }
}
