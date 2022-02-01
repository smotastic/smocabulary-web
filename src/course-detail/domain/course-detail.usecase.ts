import { Params, Usecase } from "../../core/domain/usecase";
import { CourseDetailEntity } from "./course-detail.entity";
import { CourseDetailPort } from "./course-detail.port";

export interface CourseDetailParams extends Params {
    id: string
}

export interface CourseDetailUsecase extends Usecase<CourseDetailEntity, CourseDetailParams> { }

export default class CourseDetailUsecaseImpl implements CourseDetailUsecase {

    _port: CourseDetailPort;

    constructor(port: CourseDetailPort) {
        this._port= port;
    }
    
    async execute(params: CourseDetailParams): Promise<CourseDetailEntity> {
        return this._port.findById(params.id);
    }

}