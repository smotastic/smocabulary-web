import AuthAdapter from "./auth/data/auth.adapter";
import FirebaseAuthDatasource from './auth/data/datasources/auth-firebase.datasource';
import { AuthPort } from "./auth/domain/authPort";
import { Container, injected, tag, tagged, token } from 'brandi';
import { AuthDatasource } from "./auth/data/datasources/auth.datasource";
import MockAuthDatasource from "./auth/data/datasources/auth-mock.datasource";
import { AuthUsecase, AuthUsecaseImpl } from "./auth/domain/auth.usecase";
import { CourseListPort } from "./course-list/domain/course-list.port";
import { CourseListUsecase, CourseListUsecaseImpl } from "./course-list/domain/course-list.usecase";
import CourseListAdapter from "./course-list/data/course-list.adapter";

export const TOKENS = {
    authDs: token<AuthDatasource>('authDatasource'),
    authPort: token<AuthPort>('authPort'),
    authUsecase: token<AuthUsecase>('authUsecase'),

    catalogListPort: token<CourseListPort>('catalogListPort'),
    catalogListUsecase: token<CourseListUsecase>('catalogListUsecase')
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
_container.bind(TOKENS.catalogListPort).toInstance(CourseListAdapter).inSingletonScope();

_container.bind(TOKENS.catalogListUsecase).toInstance(CourseListUsecaseImpl).inSingletonScope();
injected(CourseListUsecaseImpl, TOKENS.catalogListPort.optional);

export const container = _container;