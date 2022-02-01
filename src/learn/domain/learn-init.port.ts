import { LearnCard } from "./learn.entity";

export interface LearnInitPort {
    findCards(id: string): Promise<LearnCard[]>
}