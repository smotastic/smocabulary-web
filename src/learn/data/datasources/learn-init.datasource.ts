import { LearnCardModel } from "../learn.model";

export interface LearnInitDatasource {
    findCards(id: string): Promise<LearnCardModel[]>
}