import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { container, TOKENS } from "../../../src/service_locator";
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" },
                token: { label: "Token", type: "text" }
            },
            authorize: async (credentials, req) => {

                try {
                    const usecase = container.get(TOKENS.authUsecase);
                    const username: string = credentials.email;
                    const password: string = credentials.password;
                    const authDetails = await usecase.execute({ username, password });
                    return { email: authDetails.username, token: authDetails.token };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // https://stackoverflow.com/questions/67234794/nextjs-and-nextauth-session-user-object-getting-lost-due-to-nextauth-ts-get
        async jwt(options) {
            const token = options.user?.token;
            options.token.firebaseToken = token;
            return options.token;
        },
        async session({ session, token, user }) {
            session.firebaseToken = token.firebaseToken;
            return session
        }
    },
    pages: {
        'signIn': '/auth/signin'
    },
    secret: 'secrecy'
})