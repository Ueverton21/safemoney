import spanish from "./language_es.json";
import portuguese from "./language_pt.json";
import english from "./language_en.json";

//SCREENS LANGUAGES
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

type HomeLanguage = {
  Balance: string;
  Monthly: LanguageOption[];
};

type SettingsLanguage = {
  Exit: string;
};

type LitleBoxLanguage = {
  Title: string;
  Amount: string;
};

type GroupsLanguage = {
  Title: string;
  NewGroup: string;
};

type NewLittleBoxLanguage = {
  Title: string;
  Description: string;
  Confirm: string;
};

type NewGroupLanguage = {
  Title: string;
  Description: string;
  Confirm: string;
};

type LittleBoxDetailsLanguage = {
  Goal: string;
  Entry: string;
  Expense: string;
  ToSave: string;
  ToTakeOut: string;
};

type GroupDetailsLanguage = {
  Goal: string;
  Entry: string;
  Expense: string;
  ToSave: string;
  ToTakeOut: string;
  ParticipantsName: string;
  value: string;
  Responsible: string;
  Contributions: string;
  AddNewMember: string;
};

type ToAddPeopleLangage = {
  title: string;
  search: string;
}

//COMPONENTS LANGUAGE

type ComponentsLanguage = {
  Until: string;
};

//General
type LanguageOption = {
  Name: string;
  Acronym: string;
};

type CoinSymbol = {
  Symbol: string;
}

//Errors
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
  Home: HomeLanguage;
  Settings: SettingsLanguage;
  LittleBox: LitleBoxLanguage;
  Groups: GroupsLanguage;
  NewLittleBox: NewLittleBoxLanguage;
  NewGroup: NewGroupLanguage;
  LittleBoxDetails: LittleBoxDetailsLanguage;
  GroupDetails: GroupDetailsLanguage;
  Components: ComponentsLanguage;
  CoinSymbol: CoinSymbol;
  ToAddPeople: ToAddPeopleLangage;
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
