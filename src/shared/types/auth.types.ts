export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  store?: {
    id: string;
    storeName: string;
  };
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

export type ForgotPasswordPayload = {
  email: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};
