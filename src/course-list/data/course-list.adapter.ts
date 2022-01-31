import { CatalogEntry } from "../domain/course-list-entry.entity";
import { CatalogListPort } from "../domain/course-list.port";

export default class CatalogListAdapter implements CatalogListPort {
    list(): Promise<CatalogEntry[]> {
        throw new Error("Method not implemented.");
    }

}