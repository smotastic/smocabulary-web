import { mockHelper } from '../../../core/data/datasources/course-helper.mock';
import { CourseCreateModel } from '../course-create.model';
import { CourseCreateDatasource } from './course-create.datasource';
export default class CourseCreateMockDatasource implements CourseCreateDatasource {
    async create(model: CourseCreateModel): Promise<CourseCreateModel> {
        const add = mockHelper.add({...model, cards: []});
        return { id: 'new', ...add };
    }

}