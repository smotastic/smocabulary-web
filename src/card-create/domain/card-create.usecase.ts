import { Params, Usecase } from "../../core/domain/usecase";
import { CardCreateEntity } from "./card-create.entity";
import { CardCreatePort } from "./card-create.port";

export interface CardCreateParams extends Params {
    entity: CardCreateEntity
}

export interface CardCreateUsecase extends Usecase<CardCreateEntity, CardCreateParams> { }

export default class CardCreateUsecaseImpl implements CardCreateUsecase {

    _port: CardCreatePort;
    
    constructor(port: CardCreatePort) {
        this._port = port;
    }

    async execute(params: CardCreateParams): Promise<CardCreateEntity> {
        return this._port.create(params.entity);
    }

}