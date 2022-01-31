import { Box } from "@mui/material";

import { CourseEntry } from "../domain/course-list-entry.entity";
import CourseCard from "./course.card";

type CourseListProps = {
    courses: CourseEntry[]
}

export default function CourseList({ courses }: CourseListProps) {
    return <>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start' }}>
            {courses.map(course => <CourseCard key={course.name} course={course} />)}
        </Box>
    </>
}

