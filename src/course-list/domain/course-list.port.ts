import { CatalogEntry } from "./course-list-entry.entity";

export interface CatalogListPort {
    list(): Promise<CatalogEntry[]>;
}