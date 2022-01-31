
import { Params, Usecase } from "../../core/domain/usecase";
import { CourseEntry } from "./course-list-entry.entity";
import { CourseListPort } from "./course-list.port";

export interface CourseListParams extends Params { }

export interface CourseListUsecase extends Usecase<CourseEntry[], CourseListParams> { }

export class CourseListUsecaseImpl implements CourseListUsecase {

    _port: CourseListPort;

    constructor(port: CourseListPort) {
        this._port = port;
    }

    async execute(params: CourseListParams): Promise<CourseEntry[]> {
        return [{ name: 'Course 1', description: 'Cool beginner courseue' }, { name: 'Course 2' }, { name: 'Course 3' }];
    }
}