import { CourseDetailEntity } from "./course-detail.entity";

export interface CourseDetailPort {
    findById: (id: string) => Promise<CourseDetailEntity>
}