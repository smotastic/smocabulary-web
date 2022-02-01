export interface CourseDetailEntity {
    id?: string,
    name: string,
    description?: string,
    cards: CourseDetailCard[]
}

export interface CourseDetailCard {
    id: string,
    question: string,
    answer: string,
}