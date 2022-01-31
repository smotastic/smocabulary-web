import { CourseCreateEntity } from "./course-create.entity";

export interface CourseCreatePort {
    create(entity: CourseCreateEntity): Promise<CourseCreateEntity>;
}