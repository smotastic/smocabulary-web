import { CourseListModel } from "../course-list.model";

export interface CourseListDatasource {
    list(): Promise<CourseListModel[]>
}