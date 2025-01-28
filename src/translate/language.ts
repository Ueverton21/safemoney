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
};

export type Language = {
  Login: LoginLanguange;
  Create: CreateLanguage;
};

export function selectLanguage(language: string): Language {
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
