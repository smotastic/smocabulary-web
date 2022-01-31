import { Box } from "@mui/material";
import { useContext, useEffect } from "react";

import { CourseEntry } from "../domain/course-list-entry.entity";
import { CourseListContext } from "./context/course-list.context";
import CourseListView from "./course-list.view";
import CourseCard from "./course.card";

type CourseListProps = {
    courses: CourseEntry[]
}

export default function CourseListContainer({ courses }: CourseListProps) {
    const { setCourses } = useContext(CourseListContext);
    useEffect(() => {
        setCourses(courses);
    }, [])
    return <>
        <CourseListView />
    </>
}

