export type APICountriesList = {
  name: string;
  countryCode: string;
}[];

export interface APICountryInfo {
  name: string;
  borders: bordersItem[];
  population: populationItem[];
  flag: string;
}

type bordersItem = {
  name: "string";
  iso2: "string";
}

type populationItem = {
  year: number;
  value: number;
}
