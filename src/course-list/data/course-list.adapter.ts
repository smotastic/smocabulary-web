import { CourseEntry } from "../domain/course-list-entry.entity";
import { CourseListPort } from "../domain/course-list.port";
import { CourseListDatasource } from "./datasources/course-list.datasource";

export default class CourseListAdapter implements CourseListPort {

    _courseListDs: CourseListDatasource;

    constructor(courseListDs: CourseListDatasource) {
        this._courseListDs = courseListDs;
    }

    list(): Promise<CourseEntry[]> {
        return this._courseListDs.list();
    }

}