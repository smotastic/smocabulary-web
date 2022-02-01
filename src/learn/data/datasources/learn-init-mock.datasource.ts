import { mockHelper } from "../../../core/data/datasources/course-helper.mock";
import { LearnCardModel } from "../learn.model";
import { LearnInitDatasource } from "./learn-init.datasource";

export default class LearnInitMockDatasource implements LearnInitDatasource {
    async findCards(id: string): Promise<LearnCardModel[]> {
        const course = mockHelper.db.find(m => m.id === id);

        if(course && course.cards) {
            return [...course.cards];
        }
        return []
    }

}