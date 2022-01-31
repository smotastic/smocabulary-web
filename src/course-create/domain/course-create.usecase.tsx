import { Params, Usecase } from "../../core/domain/usecase";
import { CourseCreateEntity } from "./course-create.entity";

export interface CourseCreateParams extends Params {
    entity: CourseCreateEntity
}

export interface CourseCreateUsecase extends Usecase<CourseCreateEntity, CourseCreateParams> { }

export default class CourseCreateUsecaseImpl implements CourseCreateUsecase {
    async execute(params: CourseCreateParams): Promise<CourseCreateEntity> {
        return { id: 'new', name: params.entity.name, description: 'A long description' };
    }

}