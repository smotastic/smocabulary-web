import { Params, Usecase } from "../../core/domain/usecase";
import { LearnInitPort } from "./learn-init.port";
import { LearnCard } from "./learn.entity";

export interface LearnInitParams extends Params {
    id: string,
}

export interface LearnInitUsecase extends Usecase<LearnCard[], LearnInitParams> { }

export default class LearnInitUsecaseImpl implements LearnInitUsecase {

    _port: LearnInitPort;

    constructor(port: LearnInitPort) {
        this._port = port;
    }

    async execute(params: LearnInitParams): Promise<LearnCard[]> {
        return this._port.findCards(params.id);
    }

}