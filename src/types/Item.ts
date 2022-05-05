import { Manufacturer } from "./Manufacturer";

export type Item = {
  id: number;
  name: string;
  code: string;
  buyPrice: number;
  recomendedSellPrice: number;
  manufacturer: Manufacturer;
};
