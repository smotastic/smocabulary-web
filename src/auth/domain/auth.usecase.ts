import { Params, Usecase } from "../../core/domain/usecase";
import { AuthEntity } from "./auth.entity";
import { AuthPort } from "./authPort";

export interface AuthParams extends Params {
    username: string,
    password: string
}
export interface AuthUsecase extends Usecase<AuthEntity, AuthParams> {

}

export class AuthUsecaseImpl implements AuthUsecase {

    _port: AuthPort;

    constructor(port: AuthPort) {
        this._port = port;
    }

    execute(params: AuthParams): Promise<AuthEntity> {
        return this._port.signin(params.username, params.password);
    }

}

