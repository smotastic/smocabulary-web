import { useQuery } from "react-query"
import { container, TOKENS } from "../../service_locator"
import CourseDetailLoading from "./course-detail.loading";
import CourseDetailView from "./course-detail.view";

type CourseDetailContainerProps = {
    id: string,
}

export default function CourseDetailContainer({ id }: CourseDetailContainerProps) {
    const usecase = container.get(TOKENS.courseDetailUsecase);
    const {data, isLoading} = useQuery(`course-detail${id}`, () => usecase.execute({ id }));
    if(isLoading || !data) {
        return <CourseDetailLoading />
    }
    return <CourseDetailView course={data} />

}