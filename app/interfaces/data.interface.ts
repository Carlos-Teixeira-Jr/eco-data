export interface GbifSearchResponse {
  offset: number
  limit: number
  endOfRecords: boolean
  count: number
  results: GbifResult[]
  facets: GbifFacet[]
}

export interface GbifResult {
  key: number
  nameKey: number
  datasetKey: string
  constituentKey: string
  nubKey: number
  parentKey: number
  parent: string
  acceptedKey: number
  accepted: string
  basionymKey: number
  basionym: string
  kingdom: string
  phylum: string
  order: string
  family: string
  genus: string
  subgenus: string
  species: string
  kingdomKey: number
  phylumKey: number
  classKey: number
  orderKey: number
  familyKey: number
  genusKey: number
  subgenusKey: number
  speciesKey: number
  scientificName: string
  canonicalName: string
  authorship: string
  publishedIn: string
  accordingTo: string
  nameType: NameType
  taxonomicStatus: TaxonomicStatus
  rank: TaxonomicRank
  origin: Origin
  numDescendants: number
  numOccurrences: number
  taxonID: string
  extinct: boolean
  habitats: Habitat[]
  nomenclaturalStatus: NomenclaturalStatus[]
  threatStatuses: ThreatStatus[]
  descriptions: GbifDescription[]
  vernacularNames: GbifVernacularName[]
  synonym: boolean
  higherClassificationMap: Record<string, string>
  class: string
}

export interface GbifDescription {
  key: number
  taxonKey: number
  type: string
  language: string
  description: string
  source: string
  sourceTaxonKey: number
  creator: string
  contributor: string
  license: string
}

export interface GbifVernacularName {
  taxonKey: number
  vernacularName: string
  language: string
  lifeStage: string
  sex: string
  country: string
  area: string
  source: string
  sourceTaxonKey: number
  preferred: boolean
  plural: boolean
}

export interface GbifFacet {
  field: string
  counts: {
    name: string
    count: number
  }[]
}

// ENUMS

export type NameType =
  | 'SCIENTIFIC'
  | 'VIRUS'
  | 'HYBRID'
  | 'INFORMAL'
  | 'CULTIVAR'
  | 'CANDIDATUS'
  | 'OTU'
  | 'DOUBTFUL'
  | 'PLACEHOLDER'
  | 'NO_NAME'
  | 'BLACKLISTED'

export type TaxonomicStatus =
  | 'ACCEPTED'
  | 'DOUBTFUL'
  | 'SYNONYM'
  | 'HETEROTYPIC_SYNONYM'
  | 'HOMOTYPIC_SYNONYM'
  | 'PROPARTE_SYNONYM'
  | 'MISAPPLIED'

export type TaxonomicRank =
  | 'DOMAIN'
  | 'SUPERKINGDOM'
  | 'KINGDOM'
  | 'SUBKINGDOM'
  | 'INFRAKINGDOM'
  | 'SUPERPHYLUM'
  | 'PHYLUM'
  | 'SUBPHYLUM'
  | 'INFRAPHYLUM'
  | 'SUPERCLASS'
  | 'CLASS'
  | 'SUBCLASS'
  | 'INFRACLASS'
  | 'PARVCLASS'
  | 'SUPERLEGION'
  | 'LEGION'
  | 'SUBLEGION'
  | 'INFRALEGION'
  | 'SUPERCOHORT'
  | 'COHORT'
  | 'SUBCOHORT'
  | 'INFRACOHORT'
  | 'MAGNORDER'
  | 'SUPERORDER'
  | 'GRANDORDER'
  | 'ORDER'
  | 'SUBORDER'
  | 'INFRAORDER'
  | 'PARVORDER'
  | 'SUPERFAMILY'
  | 'FAMILY'
  | 'SUBFAMILY'
  | 'INFRAFAMILY'
  | 'SUPERTRIBE'
  | 'TRIBE'
  | 'SUBTRIBE'
  | 'INFRATRIBE'
  | 'SUPRAGENERIC_NAME'
  | 'GENUS'
  | 'SUBGENUS'
  | 'INFRAGENUS'
  | 'SECTION'
  | 'SUBSECTION'
  | 'SERIES'
  | 'SUBSERIES'
  | 'INFRAGENERIC_NAME'
  | 'SPECIES_AGGREGATE'
  | 'SPECIES'
  | 'INFRASPECIFIC_NAME'
  | 'GREX'
  | 'SUBSPECIES'
  | 'CULTIVAR_GROUP'
  | 'CONVARIETY'
  | 'INFRASUBSPECIFIC_NAME'
  | 'PROLES'
  | 'RACE'
  | 'NATIO'
  | 'ABERRATION'
  | 'MORPH'
  | 'VARIETY'
  | 'SUBVARIETY'
  | 'FORM'
  | 'SUBFORM'
  | 'PATHOVAR'
  | 'BIOVAR'
  | 'CHEMOVAR'
  | 'MORPHOVAR'
  | 'PHAGOVAR'
  | 'SEROVAR'
  | 'CHEMOFORM'
  | 'FORMA_SPECIALIS'
  | 'CULTIVAR'
  | 'STRAIN'
  | 'OTHER'
  | 'UNRANKED'

export type Habitat = 'MARINE' | 'FRESHWATER' | 'TERRESTRIAL'

export type ThreatStatus =
  | 'EXTINCT'
  | 'EXTINCT_IN_THE_WILD'
  | 'REGIONALLY_EXTINCT'
  | 'CRITICALLY_ENDANGERED'
  | 'ENDANGERED'
  | 'VULNERABLE'
  | 'NEAR_THREATENED'
  | 'LEAST_CONCERN'
  | 'DATA_DEFICIENT'
  | 'NOT_APPLICABLE'
  | 'NOT_EVALUATED'

export type NomenclaturalStatus =
  | 'LEGITIMATE'
  | 'VALIDLY_PUBLISHED'
  | 'NEW_COMBINATION'
  | 'REPLACEMENT'
  | 'CONSERVED'
  | 'PROTECTED'
  | 'CORRECTED'
  | 'ORIGINAL_COMBINATION'
  | 'NEW_SPECIES'
  | 'NEW_GENUS'
  | 'ALTERNATIVE'
  | 'OBSCURE'
  | 'CONSERVED_PROPOSED'
  | 'PROVISIONAL'
  | 'SUBNUDUM'
  | 'REJECTED_PROPOSED'
  | 'REJECTED_OUTRIGHT_PROPOSED'
  | 'DOUBTFUL'
  | 'AMBIGUOUS'
  | 'CONFUSED'
  | 'FORGOTTEN'
  | 'ABORTED'
  | 'ORTHOGRAPHIC_VARIANT'
  | 'SUPERFLUOUS'
  | 'NUDUM'
  | 'NULL_NAME'
  | 'SUPPRESSED'
  | 'REJECTED_OUTRIGHT'
  | 'REJECTED'
  | 'ILLEGITIMATE'
  | 'INVALID'
  | 'DENIED'

export type Origin =
  | 'SOURCE'
  | 'DENORMED_CLASSIFICATION'
  | 'VERBATIM_PARENT'
  | 'VERBATIM_ACCEPTED'
  | 'VERBATIM_BASIONYM'
  | 'PROPARTE'
  | 'AUTONYM'
  | 'IMPLICIT_NAME'
  | 'MISSING_ACCEPTED'
  | 'BASIONYM_PLACEHOLDER'
  | 'EX_AUTHOR_SYNONYM'
  | 'OTHER'
