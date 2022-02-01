import { CourseDetailEntity } from "../../domain/course-detail.entity";
import { CourseDetailModel } from "../course-detail.model";

export interface CourseDetailDatasource {
    findById: (id: string) => Promise<CourseDetailModel>
}