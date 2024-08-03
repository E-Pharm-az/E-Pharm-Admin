import { BaseEntity } from "@/types/base-entity.ts";

export interface Pharmacy extends BaseEntity {
  tin: string;
  phone: string;
  ownerEmail: string;
  email: string;
  address: string;
  isActive: boolean;
}
