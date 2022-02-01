import { CardCreateModel } from "../card-create.model";

export interface CardCreateDatasource {
    create: (model: CardCreateModel) => Promise<CardCreateModel>,
}