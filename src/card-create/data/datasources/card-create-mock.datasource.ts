import { mockHelper } from "../../../core/data/datasources/course-helper.mock";
import { CardCreateModel } from "../card-create.model";
import { CardCreateDatasource } from "./card-create.datasource";

export default class CardCreateMockDatasource implements CardCreateDatasource {
    async create(model: CardCreateModel): Promise<CardCreateModel> {
        const _db = mockHelper.db;
        const course = _db.find(m => m.id === model.course_id);
        const newCard = { ...model, id: `${course.cards.length + 1}` };
        course.cards = [...course.cards, newCard];
        return newCard;
    }

}