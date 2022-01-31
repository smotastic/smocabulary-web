import { Box } from "@mui/material";
import { useContext } from "react";
import { CourseListContext } from "./context/course-list.context";
import CourseCard from "./course.card";

export default function CourseListView() {
    const { courses } = useContext(CourseListContext);
    return <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {courses.map(course => <CourseCard key={course.name} course={course} />)}
    </Box>;
}