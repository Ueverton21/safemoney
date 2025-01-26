type LoginLanguange = {
  FieldEmail: string;
  Password: string;
  Login: string;
  Create: string;
};

type CreateLanguage = {
  Name: string;
};

type Language = {
  Login: LoginLanguange;
  Create: CreateLanguage;
};
