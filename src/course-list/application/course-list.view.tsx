import { Box } from "@mui/material";
import { useContext } from "react";
import { CourseEntry } from "../domain/course-list-entry.entity";
import { CourseListContext } from "./context/course-list.context";
import CourseCard from "./course.card";
type CourseListProps = {
    courses: CourseEntry[]
}
export default function CourseListView({ courses }: CourseListProps) {
    // const { courses } = useContext(CourseListContext);
    return <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {courses.map(course => <CourseCard key={course.name} course={course} />)}
    </Box>;
}