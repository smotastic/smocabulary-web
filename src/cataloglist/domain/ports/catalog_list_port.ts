import { CatalogEntry } from "../entities/catalog_entry";

export interface CatalogListPort {
    list(): Promise<CatalogEntry[]>;
}