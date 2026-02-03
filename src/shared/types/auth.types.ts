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
