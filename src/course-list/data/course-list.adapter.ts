import { CourseEntry } from "../domain/course-list-entry.entity";
import { CourseListPort } from "../domain/course-list.port";

export default class CourseListAdapter implements CourseListPort {
    list(): Promise<CourseEntry[]> {
        throw new Error("Method not implemented.");
    }

}