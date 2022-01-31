import { CourseCreateEntity } from "../domain/course-create.entity";
import { CourseCreatePort } from "../domain/course-create.port";
import { CourseCreateDatasource } from "./datasources/course-create.datasource";

export default class CourseCreateAdapter implements CourseCreatePort {
    _ds: CourseCreateDatasource;

    constructor(ds: CourseCreateDatasource) {
        this._ds = ds;
    }

    async create(entity: CourseCreateEntity): Promise<CourseCreateEntity> {
        const result = await this._ds.create(entity);
        return result;
    }

}