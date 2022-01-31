import AuthAdapter from "./auth/data/adapter/authAdapter";
import FirebaseAuthDatasource from './auth/data/datasources/firebaseAuthDs';
import { AuthPort } from "./auth/domain/ports/authPort";
import { Container, injected, tag, tagged, token } from 'brandi';
import { AuthDatasource } from "./auth/data/datasources/authDatasource";
import MockAuthDatasource from "./auth/data/datasources/mockAuthDs";
import { AuthUsecase, AuthUsecaseImpl } from "./auth/domain/usecase/auth_usecase";
import { CatalogListPort } from "./cataloglist/domain/ports/catalog_list_port";
import { CatalogListUsecase, CatalogListUsecaseImpl } from "./cataloglist/domain/usecase/catalog_list_usecase";
import CatalogListAdapter from "./cataloglist/data/adapter/catalog_list_adapter";

export const TOKENS = {
    authDs: token<AuthDatasource>('authDatasource'),
    authPort: token<AuthPort>('authPort'),
    authUsecase: token<AuthUsecase>('authUsecase'),

    catalogListPort: token<CatalogListPort>('catalogListPort'),
    catalogListUsecase: token<CatalogListUsecase>('catalogListUsecase')
};

export const TAGS = {
    dev: tag('dev'),
};

if (process.env.AUTH_REPOSITORY === 'mock') {
    tagged(AuthAdapter, TAGS.dev);
}

export const _container = new Container();

// ####### AUTHENTICATION FEATURE
_container.bind(TOKENS.authDs).toInstance(FirebaseAuthDatasource).inSingletonScope();
_container.when(TAGS.dev).bind(TOKENS.authDs).toInstance(MockAuthDatasource).inSingletonScope();

_container.bind(TOKENS.authPort).toInstance(AuthAdapter).inSingletonScope();
injected(AuthAdapter, TOKENS.authDs.optional);

_container.bind(TOKENS.authUsecase).toInstance(AuthUsecaseImpl).inSingletonScope();
injected(AuthUsecaseImpl, TOKENS.authPort.optional);

// ####### CATALOGLIST FEATURE
_container.bind(TOKENS.catalogListPort).toInstance(CatalogListAdapter).inSingletonScope();

_container.bind(TOKENS.catalogListUsecase).toInstance(CatalogListUsecaseImpl).inSingletonScope();
injected(CatalogListUsecaseImpl, TOKENS.catalogListPort.optional);

export const container = _container;