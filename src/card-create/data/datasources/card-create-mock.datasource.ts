import { mockHelper } from "../../../core/data/datasources/course-helper.mock";
import { CardCreateModel } from "../card-create.model";
import { CardCreateDatasource } from "./card-create.datasource";

export default class CardCreateMockDatasource implements CardCreateDatasource {
    async create(model: CardCreateModel): Promise<CardCreateModel> {
        const _db = mockHelper.db;
        const course = _db.find(m => m.id === model.course_id);
        const length = course.cards ? course.cards.length : 0;
        const newCard = { ...model, id: `${length + 1}` };
        course.cards = [...course.cards ?? [], newCard];
        return newCard;
    }

}