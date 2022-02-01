import { CardCreateEntity } from "../domain/card-create.entity";
import { CardCreatePort } from "../domain/card-create.port";
import { CardCreateDatasource } from "./datasources/card-create.datasource";

export default class CardCreateAdapter implements CardCreatePort {

    _ds: CardCreateDatasource;
    constructor(ds: CardCreateDatasource) {
        this._ds = ds;
    }

    async create(entity: CardCreateEntity): Promise<CardCreateEntity> {
        return this._ds.create(entity);
    }

}