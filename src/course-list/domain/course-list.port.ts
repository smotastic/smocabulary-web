import { CourseEntry } from "./course-list-entry.entity";

export interface CourseListPort {
    list(): Promise<CourseEntry[]>;
}