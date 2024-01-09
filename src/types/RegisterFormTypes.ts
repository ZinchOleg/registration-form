export type FormInput = {
  id: number,
  title: string,
  placeholder: string,
  name: "userName" | "email" | "password" | "passwordConfirmation",
  type: string,
  required: boolean,
};

export type Inputs = {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};