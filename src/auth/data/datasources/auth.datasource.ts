import { AuthModel } from "../auth.model";

export interface AuthDatasource {
    signin: (username: string, password: string) => Promise<AuthModel>;
}