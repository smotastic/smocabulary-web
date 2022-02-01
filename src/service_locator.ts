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
import CourseDetailUsecaseImpl, { CourseDetailUsecase } from "./course-detail/domain/course-detail.usecase";
import { CourseDetailPort } from "./course-detail/domain/course-detail.port";
import CourseDetailAdapter from "./course-detail/data/course-detail.adapter";
import { CourseDetailDatasource } from "./course-detail/data/datasources/course-detail.datasource";
import CourseDetailFirebaseDatasource from "./course-detail/data/datasources/course-detail-firebase.datasource";
import CourseDetailMockDatasource from "./course-detail/data/datasources/course-detail-mock.datasource";
import { CardCreateDatasource } from "./card-create/data/datasources/card-create.datasource";
import { CardCreatePort } from "./card-create/domain/card-create.port";
import CardCreateUsecaseImpl, { CardCreateUsecase } from "./card-create/domain/card-create.usecase";
import CardCreateFirebaseDatasource from "./card-create/data/datasources/card-create-firebase.datasource";
import CardCreateAdapter from "./card-create/data/card-create.adapter";
import CardCreateMockDatasource from "./card-create/data/datasources/card-create-mock.datasource";
import { LearnInitDatasource } from "./learn/data/datasources/learn-init.datasource";
import LearnInitUsecaseImpl, { LearnInitUsecase } from "./learn/domain/learn-init.usecase";
import { LearnInitPort } from "./learn/domain/learn-init.port";
import LearnInitAdapter from "./learn/data/learn-init.adapter";
import LearnInitFirebaseDatasource from "./learn/data/datasources/learn-init-firebase.datasource";
import LearnInitMockDatasource from "./learn/data/datasources/learn-init-mock.datasource";

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

    courseDetailDs: token<CourseDetailDatasource>('courseDetailDs'),
    courseDetailPort: token<CourseDetailPort>('courseDetailPort'),
    courseDetailUsecase: token<CourseDetailUsecase>('courseDetailUsecase'),

    cardCreateDs: token<CardCreateDatasource>('cardCreateDs'),
    cardCreatePort: token<CardCreatePort>('cardCreatePort'),
    cardCreateUsecase: token<CardCreateUsecase>('cardCreateUsecase'),

    learnInitDs: token<LearnInitDatasource>('learnInitDs'),
    learnInitPort: token<LearnInitPort>('learnInitPort'),
    learnInitUsecase: token<LearnInitUsecase>('learnInitUsecase'),
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
            tagged(CourseDetailAdapter, TAGS.dev);
            tagged(CardCreateAdapter, TAGS.dev);
            tagged(LearnInitAdapter, TAGS.dev);
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

        this._container.bind(TOKENS.courseCreateUsecase).toInstance(CourseCreateUsecaseImpl).inSingletonScope();
        injected(CourseCreateUsecaseImpl, TOKENS.courseCreatePort.optional);

        // ####### COURSEDETAIL FEATURE
        this._container.bind(TOKENS.courseDetailDs).toInstance(CourseDetailFirebaseDatasource).inSingletonScope();
        this._container.when(TAGS.dev).bind(TOKENS.courseDetailDs).toInstance(CourseDetailMockDatasource).inSingletonScope();
        this._container.bind(TOKENS.courseDetailPort).toInstance(CourseDetailAdapter).inSingletonScope();
        injected(CourseDetailAdapter, TOKENS.courseDetailDs.optional);

        this._container.bind(TOKENS.courseDetailUsecase).toInstance(CourseDetailUsecaseImpl).inSingletonScope();
        injected(CourseDetailUsecaseImpl, TOKENS.courseDetailPort.optional);

        // ####### CARDCREATE FEATURE
        this._container.bind(TOKENS.cardCreateDs).toInstance(CardCreateFirebaseDatasource).inSingletonScope();
        this._container.when(TAGS.dev).bind(TOKENS.cardCreateDs).toInstance(CardCreateMockDatasource).inSingletonScope();

        this._container.bind(TOKENS.cardCreatePort).toInstance(CardCreateAdapter).inSingletonScope();
        injected(CardCreateAdapter, TOKENS.cardCreateDs.optional);

        this._container.bind(TOKENS.cardCreateUsecase).toInstance(CardCreateUsecaseImpl).inSingletonScope();
        injected(CardCreateUsecaseImpl, TOKENS.cardCreatePort.optional);

        // ####### LEARN
        this._container.bind(TOKENS.learnInitDs).toInstance(LearnInitFirebaseDatasource).inSingletonScope();
        this._container.when(TAGS.dev).bind(TOKENS.learnInitDs).toInstance(LearnInitMockDatasource).inSingletonScope();

        this._container.bind(TOKENS.learnInitPort).toInstance(LearnInitAdapter).inSingletonScope();
        injected(LearnInitAdapter, TOKENS.learnInitDs.optional);

        this._container.bind(TOKENS.learnInitUsecase).toInstance(LearnInitUsecaseImpl).inSingletonScope();
        injected(LearnInitUsecaseImpl, TOKENS.learnInitPort.optional);

    }

    public get<T extends TokenValue>(token: T): TokenType<T> {
        return this._container.get(token);
    }

}

export const container = new ServiceLocator();
