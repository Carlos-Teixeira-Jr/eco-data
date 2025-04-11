export const taxonomicRanks = [
  { key: "domain", label: "Domínio" },
  { key: "kingdom", label: "Reino" },
  { key: "phylum", label: "Filo" },
  { key: "class", label: "Classe" },
  { key: "order", label: "Ordem" },
  { key: "family", label: "Família" },
  { key: "genus", label: "Gênero" },
  { key: "species", label: "Espécie" },
];

export const dropdownOptions = [
  {
    value: "domain",
    label: "Domínio",
    options: [
      {
        value: "bacteria",
        label: "Bactéria",
        options: [
          { value: "Cyanobacteria ", label: "Cianobactérias" },
          { value: "Proteobacteria", label: "Proteobactérias" },
          { value: "Actinobacteria", label: "Actinobactérias" },
          { value: "Extremophiles", label: "Extremófilas" },
        ],
      },
      {
        value: "archaea",
        label: "Arcobacteria",
        options: [
          { value: "methanogens", label: "Metanogênicas" },
          { value: "halophiles", label: "Halófilas" },
          { value: "thermophiles", label: "Termófilas" },
        ],
      },
      {
        value: "eukarya",
        label: "Eukaryota",
        options: [
          {
            value: "plantae",
            label: "Plantas",
            options: [
              { value: "bryophyta", label: "Briófitas" },
              { value: "pteridophyta", label: "Pteridófitas" },
              { value: "lycopodiophyta", label: "Licófitas" },
              { value: "cycadophyta", label: "Cicadófitas" },
              { value: "ginkgophyta", label: "Ginkgófitas" },
              { value: "coniferophyta", label: "Coníferas" },
              { value: "gnetophyta", label: "Gnetófitas" },
              { value: "magnoliophyta", label: "Angiospermas" },
              { value: "charophyta", label: "Carófitas" },
              { value: "chlorophyta", label: "Clorófitas" },
            ],
          },
          {
            value: "fungi",
            label: "Fungos",
            options: [
              { value: "chytridiomycota", label: "Quitridiomicetos" },
              { value: "zygomycota", label: "Zigomicetos" },
              { value: "glomeromycota", label: "Glomeromicetos" },
              { value: "ascomycota", label: "Ascomicetos" },
              { value: "basidiomycota", label: "Basidiomicetos" },
              { value: "microsporidia", label: "Microsporídios" },
            ],
          },
          {
            value: "protista",
            label: "Protista",
            options: [
              { value: "amoebozoa", label: "Amebozoários" },
              { value: "chromalveolata", label: "Cromalveolados" },
              { value: "excavata", label: "Excavados" },
              { value: "rhizaria", label: "Rizários" },
              { value: "archaeplastida", label: "Arqueoplastídeos" },
              { value: "opisthokonta", label: "Ophistokontos" },
            ],
          },
          {
            value: "animalia",
            label: "Animais",
            options: [
              { value: "cnidários", label: "Cnidaria" },
              { value: "Platyhelminthes ", label: "Platelmintos" },
              { value: "Nematoda", label: "Nematelmintos" },
              { value: "Annelida", label: "Anelídeos" },
              { value: "Mollusca", label: "Moluscos" },
              { value: "Arthropoda", label: "Artrópodes" },
              { value: "Echinodermata", label: "Echinodermos" },
              { value: "Chordata", label: "Cordados" },
              { value: "Ctenophora", label: "Ctenóforos" },
            ],
          },
        ],
      },
    ],
  },
];
