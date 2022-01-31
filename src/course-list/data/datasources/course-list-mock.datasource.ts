import { mockHelper } from "../../../core/data/datasources/course-helper.mock";
import { CourseListModel } from "../course-list.model";
import { CourseListDatasource } from "./course-list.datasource";

export default class CourseListMockDs implements CourseListDatasource {
    async list(): Promise<CourseListModel[]> {
        return [...mockHelper.db];
    }

}