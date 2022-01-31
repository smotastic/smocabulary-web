import AuthAdapter from "./auth/data/adapter/authAdapter";
import FirebaseAuthDatasource from './auth/data/datasources/firebaseAuthDs';
import { AuthPort } from "./auth/domain/port/authPort";
import { Container, injected, token } from 'brandi';
import { AuthDatasource } from "./auth/data/datasources/authDatasource";
import MockAuthDatasource from "./auth/data/datasources/mockAuthDs";

export const TOKENS = {
    authDs: token<AuthDatasource>('authDatasource'),
    authPort: token<AuthPort>('authPort'),
};

export const _container = new Container();

_container.bind(TOKENS.authDs).toInstance(MockAuthDatasource).inSingletonScope();

_container.bind(TOKENS.authPort).toInstance(AuthAdapter).inSingletonScope();
injected(AuthAdapter, TOKENS.authDs.optional);


export const container = _container;