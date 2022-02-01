import { CardCreateModel } from "../card-create.model";
import { CardCreateDatasource } from "./card-create.datasource";

export default class CardCreateFirebaseDatasource implements CardCreateDatasource {
    async create(model: CardCreateModel): Promise<CardCreateModel> {
        throw new Error('NOT IMPLEMENTED');
    }

}