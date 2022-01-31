import { CourseCreateModel } from '../course-create.model';
import { CourseCreateDatasource } from './course-create.datasource';
export default class CourseCreateMockDatasource implements CourseCreateDatasource {
    async create(model: CourseCreateModel): Promise<CourseCreateModel> {
        return { id: 'new', name: model.name, description: 'A long description' };
    }

}