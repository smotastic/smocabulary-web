
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

    execute(params: CourseListParams): Promise<CourseEntry[]> {
        return this._port.list();
    }
}