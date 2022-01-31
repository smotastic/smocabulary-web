import AuthAdapter from "./auth/data/auth.adapter";
import FirebaseAuthDatasource from './auth/data/datasources/auth-firebase.datasource';
import { AuthPort } from "./auth/domain/authPort";
import { Container, injected, tag, tagged, token, TokenType, TokenValue } from 'brandi';
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
import { CourseCreateDatasource } from "./course-create/data/datasources/course-create.datasource";
import { CourseCreatePort } from "./course-create/domain/course-create.port";
import CourseCreateFirebaseDatasource from "./course-create/data/datasources/course-create-firebase.datasource";
import CourseCreateMockDatasource from "./course-create/data/datasources/course-create-mock.datasource";
import CourseCreateAdapter from "./course-create/data/course-create.apapter";

export const TOKENS = {
    authDs: token<AuthDatasource>('authDatasource'),
    authPort: token<AuthPort>('authPort'),
    authUsecase: token<AuthUsecase>('authUsecase'),

    courseListDs: token<CourseListDatasource>('courseListDs'),
    courseListPort: token<CourseListPort>('courseListPort'),
    courseListUsecase: token<CourseListUsecase>('courseListUsecase'),

    courseCreateDs: token<CourseCreateDatasource>('courseCreateDs'),
    courseCreatePort: token<CourseCreatePort>('courseCreatePort'),
    courseCreateUsecase: token<CourseCreateUsecase>('courseCreateUsecase'),
};

export const TAGS = {
    dev: tag('dev'),
};
export class ServiceLocator {
    private _container: Container;

    constructor() {
        if (process.env.NEXT_PUBLIC_AUTH_REPOSITORY === 'mock') {
            tagged(CourseCreateAdapter, TAGS.dev);
            tagged(AuthAdapter, TAGS.dev);
            tagged(CourseListAdapter, TAGS.dev);
        }
        this._container = new Container();


        this._container.bind(TOKENS.courseCreateUsecase).toInstance(CourseCreateUsecaseImpl).inSingletonScope();
        injected(CourseCreateUsecaseImpl, TOKENS.courseCreatePort.optional);
        // ####### AUTHENTICATION FEATURE
        this._container.bind(TOKENS.authDs).toInstance(FirebaseAuthDatasource).inSingletonScope();
        this._container.when(TAGS.dev).bind(TOKENS.authDs).toInstance(MockAuthDatasource).inSingletonScope();

        this._container.bind(TOKENS.authPort).toInstance(AuthAdapter).inSingletonScope();
        injected(AuthAdapter, TOKENS.authDs.optional);

        this._container.bind(TOKENS.authUsecase).toInstance(AuthUsecaseImpl).inSingletonScope();
        injected(AuthUsecaseImpl, TOKENS.authPort.optional);

        // ####### COURSELIST FEATURE
        this._container.bind(TOKENS.courseListDs).toInstance(CourseListFirebaseDs).inSingletonScope();
        this._container.when(TAGS.dev).bind(TOKENS.courseListDs).toInstance(CourseListMockDs).inSingletonScope();

        this._container.bind(TOKENS.courseListPort).toInstance(CourseListAdapter).inSingletonScope();
        injected(CourseListAdapter, TOKENS.courseListDs.optional);

        this._container.bind(TOKENS.courseListUsecase).toInstance(CourseListUsecaseImpl).inSingletonScope();
        injected(CourseListUsecaseImpl, TOKENS.courseListPort.optional);

        // ####### COURSECREATE FEATURE
        this._container.bind(TOKENS.courseCreateDs).toInstance(CourseCreateFirebaseDatasource).inSingletonScope();
        this._container.when(TAGS.dev).bind(TOKENS.courseCreateDs).toInstance(CourseCreateMockDatasource).inSingletonScope();

        this._container.bind(TOKENS.courseCreatePort).toInstance(CourseCreateAdapter).inSingletonScope();
        injected(CourseCreateAdapter, TOKENS.courseCreateDs.optional);
    }

    public get<T extends TokenValue>(token: T): TokenType<T> {
        return this._container.get(token);
    }

}

export const container = new ServiceLocator();
