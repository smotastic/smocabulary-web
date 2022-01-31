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
import { CourseListDatasource } from "./course-list/data/datasources/course-list.datasource";
import CourseListFirebaseDs from "./course-list/data/datasources/course-list-firebase.datasource";
import CourseListMockDs from "./course-list/data/datasources/course-list-mock.datasource";
import CourseCreateUsecaseImpl, { CourseCreateUsecase } from "./course-create/domain/course-create.usecase";

export const TOKENS = {
    authDs: token<AuthDatasource>('authDatasource'),
    authPort: token<AuthPort>('authPort'),
    authUsecase: token<AuthUsecase>('authUsecase'),

    courseListDs: token<CourseListDatasource>('courseListDs'),
    courseListPort: token<CourseListPort>('courseListPort'),
    courseListUsecase: token<CourseListUsecase>('courseListUsecase'),

    courseCreateUsecase: token<CourseCreateUsecase>('courseCreateUsecase'),
};

export const TAGS = {
    dev: tag('dev'),
};

if (process.env.AUTH_REPOSITORY === 'mock') {
    tagged(AuthAdapter, TAGS.dev);
    tagged(CourseListAdapter, TAGS.dev);
}

export const _container = new Container();

// ####### AUTHENTICATION FEATURE
_container.bind(TOKENS.authDs).toInstance(FirebaseAuthDatasource).inSingletonScope();
_container.when(TAGS.dev).bind(TOKENS.authDs).toInstance(MockAuthDatasource).inSingletonScope();

_container.bind(TOKENS.authPort).toInstance(AuthAdapter).inSingletonScope();
injected(AuthAdapter, TOKENS.authDs.optional);

_container.bind(TOKENS.authUsecase).toInstance(AuthUsecaseImpl).inSingletonScope();
injected(AuthUsecaseImpl, TOKENS.authPort.optional);

// ####### COURSELIST FEATURE
_container.bind(TOKENS.courseListDs).toInstance(CourseListFirebaseDs).inSingletonScope();
_container.when(TAGS.dev).bind(TOKENS.courseListDs).toInstance(CourseListMockDs).inSingletonScope();

_container.bind(TOKENS.courseListPort).toInstance(CourseListAdapter).inSingletonScope();
injected(CourseListAdapter, TOKENS.courseListDs.optional);

_container.bind(TOKENS.courseListUsecase).toInstance(CourseListUsecaseImpl).inSingletonScope();
injected(CourseListUsecaseImpl, TOKENS.courseListPort.optional);

// ####### COURSECREATE FEATURE
_container.bind(TOKENS.courseCreateUsecase).toInstance(CourseCreateUsecaseImpl).inSingletonScope();

export const container = _container;