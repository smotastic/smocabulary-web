export interface CourseDetailModel {
    id?: string,
    name: string,
    description?: string,
    cards: CourseCardModel[]
}

export interface CourseCardModel {
    id: string,
    question: string,
    answer: string,
}