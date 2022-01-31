import { CourseListModel } from "../course-list.model";
import { CourseListDatasource } from "./course-list.datasource";

export default class CourseListMockDs implements CourseListDatasource {
    async list(): Promise<CourseListModel[]> {
        return [{ id: 'id1', name: 'Course 1', description: 'Nice beginner Course' }, { name: 'Course 2' }, { name: 'Course 3' }];
    }

}