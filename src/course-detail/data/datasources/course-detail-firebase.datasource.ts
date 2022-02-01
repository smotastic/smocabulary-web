import { CourseDetailModel } from "../course-detail.model";
import { CourseDetailDatasource } from "./course-detail.datasource";

export default class CourseDetailFirebaseDatasource implements CourseDetailDatasource {
    async findById(id: string): Promise<CourseDetailModel> {
        throw new Error('NOT IMPLEMENTED');
    }

}