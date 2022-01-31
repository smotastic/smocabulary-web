import { CourseListModel } from "../course-list.model";
import { CourseListDatasource } from "./course-list.datasource";

export default class CourseListFirebaseDs implements CourseListDatasource {
    list(): Promise<CourseListModel[]> {
        throw new Error("Method not implemented.");
    }

}