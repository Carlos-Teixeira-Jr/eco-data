export interface SpeciesProfile {
  taxonKey: number;
  livingPeriod?: string;
  lifeForm?: string;
  habitat?: string;
  marine?: boolean;
  freshwater?: boolean;
  terrestrial?: boolean;
  extinct?: boolean;
  hybrid?: boolean;
  ageInDays?: number;
  sizeInMillimeter?: number;
  massInGram?: number;
  source?: string;
  sourceTaxonKey?: number;
}

export interface SpeciesProfileResponse {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  count: number;
  results: SpeciesProfile[];
}
