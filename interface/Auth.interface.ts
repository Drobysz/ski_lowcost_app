export type AuthStatus = "auth" | "no_auth" | "none";
export type InputType = "text" | "email" | "password";

export interface ClientLoginRequest {
  tel: string;
  password: string;
}
