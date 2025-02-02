import spanish from "./language_es.json";
import portuguese from "./language_pt.json";
import english from "./language_en.json";

type LoginLanguange = {
  FieldEmail: string;
  Password: string;
  Login: string;
  Create: string;
};

type CreateLanguage = {
  Name: string;
  LastName: string;
  HaveAccount: string;
};
type LanguageOption = {
  Name: string;
  Acronym: string;
};

type AuthErrors = {
  InvalidCredentials: string;
  InvalidEmail: string;
};

export type Language = {
  SelectLanguage: Array<LanguageOption>;
  AuthErrors: AuthErrors;
  Name: string;
  Login: LoginLanguange;
  Create: CreateLanguage;
};

export function selectLanguage(language: string | null): Language {
  if (language === null) {
    return portuguese;
  }
  switch (language) {
    case "pt":
      return portuguese;
    case "en":
      return english;
    case "es":
      return spanish;
    default:
      return portuguese;
  }
}
