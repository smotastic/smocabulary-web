import { CardCreateEntity } from "./card-create.entity";

export interface CardCreatePort {
    create: (entity: CardCreateEntity) => Promise<CardCreateEntity>
}