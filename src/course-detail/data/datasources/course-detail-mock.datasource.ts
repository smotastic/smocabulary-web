import { mockHelper } from "../../../core/data/datasources/course-helper.mock";
import { CourseDetailModel } from "../course-detail.model";
import { CourseDetailDatasource } from "./course-detail.datasource";

export default class CourseDetailMockDatasource implements CourseDetailDatasource {
    async findById(id: string): Promise<CourseDetailModel> {
        return { ...mockHelper.db.find(m => m.id === id) };
    }

}