export type SkiingLvl = 'beginner' | 'medium' | 'confirmed';
export type Role = 'client' | 'admin';

export interface LoginTokensInterface {
    access_token: string;
    refresh_token: string;
}

export type TokenPair = LoginTokensInterface;

export interface RegisterResponse {
  data: {
    id: number;
  };
  message: string;
}

export interface UserSession {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  address: string;
  birth_date: string; // format: YYYY-MM-DD
  tel: string;
  skiing_level: SkiingLvl;
  height: number;
  weight: number;
  shoe_size: number;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface UserProfileForm {
  first_name?: string;
  last_name?: string;
  age?: number;
  address?: string;
  birth_date?: string;
  tel?: string;
  skiing_level?: SkiingLvl;
  height?: number;
  weight?: number;
  shoe_size?: number;
}
