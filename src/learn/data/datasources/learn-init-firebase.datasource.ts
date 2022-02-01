import { LearnCardModel } from "../learn.model";
import { LearnInitDatasource } from "./learn-init.datasource";

export default class LearnInitFirebaseDatasource implements LearnInitDatasource {
    async findCards(id: string): Promise<LearnCardModel[]> {
        throw new Error('NOT IMPLEMENTED');
    }

}