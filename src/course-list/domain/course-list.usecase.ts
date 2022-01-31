
import { Params, Usecase } from "../../core/domain/usecase";
import { CatalogEntry } from "./course-list-entry.entity";
import { CatalogListPort } from "./course-list.port";

export interface CatalogListParams extends Params { }

export interface CatalogListUsecase extends Usecase<CatalogEntry[], CatalogListParams> { }

export class CatalogListUsecaseImpl implements CatalogListUsecase {

    _port: CatalogListPort;

    constructor(port: CatalogListPort) {
        this._port = port;
    }

    async execute(params: CatalogListParams): Promise<CatalogEntry[]> {
        return [{ name: 'Catalog 1', description: 'Cool beginner catalogue' }, { name: 'Catalog 2' }, { name: 'Catalog 3' }];
    }
}