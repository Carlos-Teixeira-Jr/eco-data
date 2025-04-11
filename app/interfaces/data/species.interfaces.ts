export interface SpeciesSearchResponse {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  count: number;
  results: SpeciesSearchResult[];
}

export interface SpeciesSearchResult {
  key: number;
  nubKey: number;
  nameKey: number;
  taxonID: string;
  sourceTaxonKey: number;
  kingdom: string;
  phylum: string;
  order: string;
  family: string;
  genus: string;
  subgenus: string;
  species: string;
  kingdomKey: number;
  phylumKey: number;
  classKey: number;
  orderKey: number;
  familyKey: number;
  genusKey: number;
  subgenusKey: number;
  speciesKey: number;
  datasetKey: string;
  constituentKey: string;
  parentKey: number;
  parent: string;
  proParteKey: number;
  acceptedKey: number;
  accepted: string;
  basionymKey: number;
  basionym: string;
  scientificName: string;
  canonicalName: string;
  vernacularName: string;
  authorship: string;
  nameType: "SCIENTIFIC" | string;
  rank: "DOMAIN" | string;
  origin: "SOURCE" | string;
  taxonomicStatus: "ACCEPTED" | string;
  nomenclaturalStatus: string[];
  remarks: string;
  publishedIn: string;
  accordingTo: string;
  numDescendants: number;
  references: string;
  modified: string;
  deleted: string;
  lastCrawled: string;
  lastInterpreted: string;
  issues: string[];
  class: string;
}
