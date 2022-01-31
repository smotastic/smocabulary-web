import { CatalogEntry } from "../../domain/entities/catalog_entry";
import { CatalogListPort } from "../../domain/ports/catalog_list_port";

export default class CatalogListAdapter implements CatalogListPort {
    list(): Promise<CatalogEntry[]> {
        throw new Error("Method not implemented.");
    }

}