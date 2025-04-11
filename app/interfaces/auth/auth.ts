export type SigninFormData = {
  email: string;
  password: string;
}

export interface SignupFormData extends SigninFormData {
  name: string;
}