export interface Taxon {
  key: number;
  scientificName: string;
  canonicalName: string;
  vernacularName?: string;
  numDescendants: number;
  rank: string;
}