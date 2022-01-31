import { AuthDatasource } from "./auth.datasource";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default class FirebaseAuthDatasource implements AuthDatasource {

    private auth = getAuth();

    async signin(username: string, password: string) {
        try {
            const credentials = await signInWithEmailAndPassword(this.auth, username, password);
            const token = await credentials.user.getIdToken();
            return { username: credentials.user.email!, token }

        } catch (error) {
            throw new Error('Invalid Credentials');
        }
    }

}