import { CourseCreateModel } from '../course-create.model';
import { CourseCreateDatasource } from './course-create.datasource';

export default class CourseCreateFirebaseDatasource implements CourseCreateDatasource {
    create(model: CourseCreateModel): Promise<CourseCreateModel> {
        throw new Error('Method not implemented.');
    }

}