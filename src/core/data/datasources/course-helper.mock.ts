import { CourseCreateModel } from "../../../course-create/data/course-create.model";

export interface CourseHelper {
    db: CourseCreateModel[],
    add: (model: CourseCreateModel) => CourseCreateModel,
}

export default class CourseMockHelper implements CourseHelper {

    private _db: CourseCreateModel[] = [
        { id: '1', name: 'Course 1', description: 'Nice beginner Course' },
        { id: '2', name: 'Course 2', description: 'Nice beginner Course aaaaaa' },
        { id: '3', name: 'Course 3', description: 'A long description' }
    ];
    public get db(): CourseCreateModel[] {
        return this._db;
    }

    public add(model: CourseCreateModel): CourseCreateModel {
        const newModel = { ...model, id: `${this._db.length + 1}` };
        this._db.push({ ...model, id: `${this._db.length + 1}` });
        return newModel;
    }
}

export const mockHelper: CourseHelper = new CourseMockHelper();