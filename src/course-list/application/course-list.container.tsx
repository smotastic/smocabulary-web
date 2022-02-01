import { Skeleton } from "@mui/material";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { container, TOKENS } from "../../service_locator";

import { CourseEntry } from "../domain/course-list-entry.entity";
import { CourseListContext } from "./context/course-list.context";
import CourseListLoading from "./course-list.loading";
import CourseListView from "./course-list.view";

type CourseListProps = {
    courses: CourseEntry[]
}

export default function CourseListContainer() {

    const { setCourses } = useContext(CourseListContext);
    const usecase = container.get(TOKENS.courseListUsecase);
    const { isLoading, isSuccess, isError, error, data } = useQuery('course-list', () => usecase.execute({}));

    useEffect(() => {
        if (!isLoading) {
            setCourses(data);
        }
    }, [isLoading])


    if (isLoading) {
        return <CourseListLoading />
    }
    return <>
        <CourseListView />
    </>
}

