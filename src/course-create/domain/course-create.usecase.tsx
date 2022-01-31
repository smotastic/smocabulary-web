import { Params, Usecase } from "../../core/domain/usecase";
import { CourseCreateEntity } from "./course-create.entity";
import { CourseCreatePort } from "./course-create.port";

export interface CourseCreateParams extends Params {
    entity: CourseCreateEntity
}

export interface CourseCreateUsecase extends Usecase<CourseCreateEntity, CourseCreateParams> { }

export default class CourseCreateUsecaseImpl implements CourseCreateUsecase {

    _port: CourseCreatePort;

    constructor(port: CourseCreatePort) {
        this._port = port;
    }

    async execute(params: CourseCreateParams): Promise<CourseCreateEntity> {
        return this._port.create(params.entity);
    }

}