import type { SkiingLvl } from "./Session.interface";

export interface RegisterClientRequest {
  first_name: string;
  last_name: string;
  age: number;
  address: string;
  birth_date: string;
  tel: string;
  skiing_level: SkiingLvl;
  height: number;
  weight: number;
  shoe_size: number;
  password: string;
}
