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
  Entries: string;
  Expenses: string;
  MonthlyBalance: string;
  TransactionHistory: string;
  Variables: string;
  FixedExpenses: string;
};

type ProfileLanguage = {
  Title: string;
  Name: string;
  ChangePassword: string;
  CurrentPassword: string;
  NewPassword: string;
  Comfirm: string;
}

type SettingsLanguage = {
  Title: string;
  Exit: string;
  Profile: string;
};

type LitleBoxLanguage = {
  Title: string;
  Amount: string;
  Remove: string;
  PiggyBankRemoved: string;
  ListEmpty: string;
};

type DashboardLanguage = {
  Title: string;
};

type NewLittleBoxLanguage = {
  Title: string;
  Description: string;
  Confirm: string;
  Create: string;
  PiggyBankCreated: string;
  Error: string;
  FillFields: string;
  Goal: string;
  HowLong: string;

};

type ToAddLanguage = {
  Title: string;
  Add: string;
  TransactionAdded: string;
  FillFields: string;
  Description: string;
  FixedExpense: string;
  Comfirm: string;
}

type LittleBoxDetailsLanguage = {
  Goal: string;
  Entry: string;
  Expense: string;
  ToSave: string;
  ToTakeOut: string;
  Error: string;
  ExceedGoal: string;
  BelowZero: string;
  Until: string;
  ListEmpty: string;
};

//COMPONENTS LANGUAGE

type ComponentsLanguage = {
  Until: string;
  Goal: string;
  RemovePiggyBank: string;
  Remove: string;
  Yes: string;
  No: string;
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
  Profile: ProfileLanguage;
  Settings: SettingsLanguage;
  LittleBox: LitleBoxLanguage;
  Dashboard: DashboardLanguage;
  NewLittleBox: NewLittleBoxLanguage;
  LittleBoxDetails: LittleBoxDetailsLanguage;
  ToAdd: ToAddLanguage;
  Components: ComponentsLanguage;
  CoinSymbol: CoinSymbol;
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
