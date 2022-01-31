import { Box } from "@mui/material";

import { CourseEntry } from "../domain/course-list-entry.entity";
import CourseCard from "./course.card";

type CourseListProps = {
    catalogs: CourseEntry[]
}

export default function CourseList({ catalogs }: CourseListProps) {
    return <>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start' }}>
            {catalogs.map(catalog => <CourseCard key={catalog.name} catalog={catalog} />)}
        </Box>
    </>
}

