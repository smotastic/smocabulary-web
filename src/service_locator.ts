import AuthAdapter from "./auth/data/adapter/authAdapter";
import FirebaseAuthDatasource from './auth/data/datasources/firebaseAuthDs';
import { AuthPort } from "./auth/domain/port/authPort";
import { Container, injected, tag, tagged, token } from 'brandi';
import { AuthDatasource } from "./auth/data/datasources/authDatasource";
import MockAuthDatasource from "./auth/data/datasources/mockAuthDs";
import { AuthUsecase, AuthUsecaseImpl } from "./auth/domain/usecase/auth_usecase";

export const TOKENS = {
    authDs: token<AuthDatasource>('authDatasource'),
    authPort: token<AuthPort>('authPort'),
    authUsecase: token<AuthUsecase>('authUsecase'),
};

export const TAGS = {
    dev: tag('dev'),
};

if (process.env.AUTH_REPOSITORY === 'mock') {
    tagged(AuthAdapter, TAGS.dev);
}

export const _container = new Container();

_container.bind(TOKENS.authDs).toInstance(FirebaseAuthDatasource).inSingletonScope();
_container.when(TAGS.dev).bind(TOKENS.authDs).toInstance(MockAuthDatasource).inSingletonScope();

_container.bind(TOKENS.authPort).toInstance(AuthAdapter).inSingletonScope();
injected(AuthAdapter, TOKENS.authDs.optional);

_container.bind(TOKENS.authUsecase).toInstance(AuthUsecaseImpl).inSingletonScope();
injected(AuthUsecaseImpl, TOKENS.authPort.optional);


export const container = _container;