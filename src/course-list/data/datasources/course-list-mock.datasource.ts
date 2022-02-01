import { mockHelper } from "../../../core/data/datasources/course-helper.mock";
import { CourseListModel } from "../course-list.model";
import { CourseListDatasource } from "./course-list.datasource";

export default class CourseListMockDs implements CourseListDatasource {
    list(): Promise<CourseListModel[]> {
        const data = [...mockHelper.db]
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data)
            }, 1000)
        });
    }

}