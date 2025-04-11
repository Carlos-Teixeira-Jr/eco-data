export interface SpeciesMediaResponse {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  count: number;
  results: SpeciesMedia[];
}

export interface SpeciesMedia {
  type: "StillImage" | string;
  format: string;
  references: string;
  title: string;
  description: string;
  source: string;
  audience: string;
  created: string;
  creator: string;
  contributor: string;
  publisher: string;
  license: string;
  rightsHolder: string;
  taxonKey: number;
  sourceTaxonKey: number;
  identifier: string;
}
