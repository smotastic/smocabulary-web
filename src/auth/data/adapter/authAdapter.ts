import { AuthPort } from "../../domain/ports/authPort";
import { AuthDatasource } from "../datasources/authDatasource";

export default class AuthAdapter implements AuthPort {

    readonly authDatasource: AuthDatasource;

    constructor(authDatasource: AuthDatasource) {
        this.authDatasource = authDatasource;
    }

    async signin(username: string, password: string) {
        return this.authDatasource.signin(username, password);
    }
}