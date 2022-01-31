import { AuthModel } from "../model/auth_model";

export interface AuthDatasource {
    signin: (username: string, password: string) => Promise<AuthModel>;
}