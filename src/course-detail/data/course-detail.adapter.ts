import { CourseDetailEntity } from "../domain/course-detail.entity";
import { CourseDetailPort } from "../domain/course-detail.port";
import { CourseDetailDatasource } from "./datasources/course-detail.datasource";

export default class CourseDetailAdapter implements CourseDetailPort {

    _ds: CourseDetailDatasource;

    constructor(ds: CourseDetailDatasource) {
        this._ds = ds;
    }

    async findById(id: string): Promise<CourseDetailEntity> {
        return this._ds.findById(id);
    }

}