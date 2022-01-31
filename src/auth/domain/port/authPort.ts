import { AuthEntity } from "../entities/auth_entity";

// export interface AuthDetailsEntity {
//     username: string,
//     token?: string
// }
export interface AuthPort {
    signin: (username: string, password: string) => Promise<AuthEntity>;
}