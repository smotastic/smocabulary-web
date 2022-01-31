import { mockHelper } from '../../../core/data/datasources/course-helper.mock';
import { CourseCreateModel } from '../course-create.model';
import { CourseCreateDatasource } from './course-create.datasource';
export default class CourseCreateMockDatasource implements CourseCreateDatasource {
    async create(model: CourseCreateModel): Promise<CourseCreateModel> {
        mockHelper.add(model);
        return { id: 'new', ...model };
    }

}