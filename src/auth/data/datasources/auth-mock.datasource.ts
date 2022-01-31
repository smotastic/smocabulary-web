import { AuthDatasource } from "./auth.datasource";

export default class MockAuthDatasource implements AuthDatasource {
    async signin(username: string, password: string) {
        if (username === 'wrong') {
            throw new Error('Invalid Credentials');
        }
        return { username };
    }

}