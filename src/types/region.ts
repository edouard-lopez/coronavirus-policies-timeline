import { regions } from "../Region/regions";

export type Region = typeof regions[number];
export type Regions = Array<Region>;
