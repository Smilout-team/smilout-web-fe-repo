export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
};
