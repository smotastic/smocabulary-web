import { Skeleton } from "@mui/material";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { container, TOKENS } from "../../service_locator";

import { CourseEntry } from "../domain/course-list-entry.entity";
import { CourseListParams } from "../domain/course-list.usecase";
import { CourseListContext } from "./context/course-list.context";
import CourseListLoading from "./course-list.loading";
import CourseListView from "./course-list.view";

export default function CourseListContainer() {

    const usecase = container.get(TOKENS.courseListUsecase);
    const { isLoading, isSuccess, isError, error, data, status, isRefetching } = useQuery('course-list', (params: CourseListParams) => usecase.execute(params));
    if (isLoading) {
        return <CourseListLoading />
    }
    return <>
        <CourseListView courses={data} />
    </>
}

