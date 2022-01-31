import { CourseCreateModel } from "../course-create.model";

export interface CourseCreateDatasource {
    create(model: CourseCreateModel) : Promise<CourseCreateModel>;
}