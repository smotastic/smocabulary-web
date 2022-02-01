import { CourseDetailModel } from "../../../course-detail/data/course-detail.model";

export interface CourseHelper {
    db: CourseDetailModel[],
    add: (model: CourseDetailModel) => CourseDetailModel,
}

export default class CourseMockHelper implements CourseHelper {

    private _db: CourseDetailModel[] = [
        {
            id: '1', name: 'Course 1', description: 'Nice beginner Course',
            cards: [
                { id: 'c1', question: 'What is 1+1', answer: '3' },
                { id: 'c2', question: 'Capital of Germany?', answer: 'Berlin' },
                { id: 'c3', question: 'The duck says?', answer: 'Quak' },
                { id: 'c4', question: 'How tall are you?', answer: 'Super tall' }
            ]
        },
        {
            id: '2', name: 'Course 2', description: 'Nice beginner Course aaaaaa',
            cards: [
                { id: 'c1', question: 'What is 1+1', answer: '3' },
                { id: 'c2', question: 'Capital of Germany?', answer: 'Berlin' },
                { id: 'c3', question: 'The duck says?', answer: 'Quak' },
                { id: 'c4', question: 'How tall are you?', answer: 'Super tall' }
            ]
        },
        {
            id: '3', name: 'Course 3', description: 'A long description',
            cards: [
                { id: 'c1', question: 'What is 1+1', answer: '3' },
                { id: 'c2', question: 'Capital of Germany?', answer: 'Berlin' },
                { id: 'c3', question: 'The duck says?', answer: 'Quak' },
                { id: 'c4', question: 'How tall are you?', answer: 'Super tall' }
            ]
        }
    ];
    public get db(): CourseDetailModel[] {
        return this._db;
    }

    public add(model: CourseDetailModel): CourseDetailModel {
        const newModel = { ...model, id: `${this._db.length + 1}` };
        this._db.push({ ...model, id: `${this._db.length + 1}` });
        return newModel;
    }
}

export const mockHelper: CourseHelper = new CourseMockHelper();