import { useQueryClient } from "react-query";
import { Bridge } from "../../core/application/bridge";
import { CourseEntry } from "../../course-list/domain/course-list-entry.entity";
import { CourseCreateEntity } from "../domain/course-create.entity";

export default function useCourseListBridge(): Bridge<CourseCreateEntity, void> {
    const queryClient = useQueryClient();
    return {
        connect: (data) => queryClient.setQueryData('course-list', (old: CourseEntry[]) => [...old, data])
    }
}