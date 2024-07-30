import { BaseEntity } from "@/types/base-entity.ts";

export interface ActiveIngredient extends BaseEntity {
    description: string;
}

export interface Allergy extends BaseEntity {}

export interface DosageForm extends BaseEntity {}

export interface Indication extends BaseEntity {
  description: string;
}

export interface SpecialRequirement extends BaseEntity {
    minimumAgeInMonthsRequirement: number;
    maximumAgeInMonthsRequirement: number;
    minimumWeighInKgRequirement: number;
    maximumWeighInKgRequirement: number;
    medicalConditionsDescription: string;
    otherRequirementsDescription: string;
}

export interface RegulatoryInformation extends BaseEntity {
    approvalDate: Date
    certification: string;
}

export interface RouteOfAdministration extends BaseEntity {}

export interface SideEffect extends BaseEntity {
    description: string;
}

export interface UsageWarning extends BaseEntity {}

export interface Manufacturer extends BaseEntity {
    country: string;
    website: string;
    email: string;
}

export interface Warehouse extends BaseEntity {
    address: string;
    productInventory: number;
}

export interface Stock extends BaseEntity {
    productId: number;
    warehouse: Warehouse;
    quantity: number;
}