import { Pharmacy } from "@/types/pharmacy.ts";
import {
  ActiveIngredient, Allergy,
  DosageForm, Indication,
  Manufacturer,
  RegulatoryInformation,
  RouteOfAdministration, SideEffect,
  SpecialRequirement, Stock, UsageWarning,
} from "@/types/product-attributes.ts";
import { BaseEntity } from "@/types/base-entity.ts";

export interface Product extends BaseEntity {
  pharmacy: Pharmacy;
  description: string;
  imageUrl?: string;
  isApproved: boolean;
  ApprovedByAdminId?: string;
  strengthMg: number;
  contraindicationsDescription: string;
  storageConditionDescription: string;
  price: number;
  batchNumber?: string;
  barcode: string;
  packagingWeight: number;
  specialRequirement: SpecialRequirement;
  manufacturer: Manufacturer;
  regulatoryInformation: RegulatoryInformation;
  activeIngredients: ActiveIngredient[];
  dosageForms: DosageForm[];
  routeOfAdministrations: RouteOfAdministration[];
  sideEffects: SideEffect[];
  usageWarnings: UsageWarning[];
  allergies: Allergy[];
  indications: Indication[];
  stock: Stock[];
}
