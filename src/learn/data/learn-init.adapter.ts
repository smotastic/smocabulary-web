import { LearnInitPort } from "../domain/learn-init.port";
import { LearnCard } from "../domain/learn.entity";
import { LearnInitDatasource } from "./datasources/learn-init.datasource";


export default class LearnInitAdapter implements LearnInitPort {

    _ds: LearnInitDatasource;

    constructor(ds: LearnInitDatasource) {
        this._ds = ds;
    }
    findCards(id: string): Promise<LearnCard[]> {
        return this._ds.findCards(id);
    }

}