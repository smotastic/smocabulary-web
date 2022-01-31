import { AuthDetailsEntity } from "../../domain/port/authPort";

export interface AuthDatasource {
    signin: (username: string, password: string) => Promise<AuthDetailsEntity>;
}