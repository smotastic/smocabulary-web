import { useQueryClient } from "react-query";
import { Bridge } from "../../core/application/bridge";
import { CourseDetailEntity } from "../../course-detail/domain/course-detail.entity";
import { CardCreateEntity } from "../domain/card-create.entity";

export default function useCourseDetailBridge(): Bridge<CardCreateEntity, void> {
    const queryClient = useQueryClient();
    return {
        connect: (data) => queryClient.setQueryData(`course-detail${data.course_id}`, (old: CourseDetailEntity) => {
            const oldCards = old.cards ?? [];
            return { ...old, cards: [...oldCards, data] };
        })
    }
}