export interface IUCNCategoryResponse {
  category: "EXTINCT" | "CRITICALLY_ENDANGERED" | "ENDANGERED" | "VULNERABLE" | "NEAR_THREATENED" | "LEAST_CONCERN" | "DATA_DEFICIENT" | "NOT_EVALUATED" | "NOT_APPLICABLE" | string;
  usageKey: number;
  scientificName: string;
  taxonomicStatus: "ACCEPTED" | string;
  acceptedName: string;
  acceptedUsageKey: number;
  iucnTaxonID: string;
  code: string;
}
