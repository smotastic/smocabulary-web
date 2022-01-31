import { BoxProps, Box, Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { CourseEntry } from "../domain/course-list-entry.entity";

type CourseCardProps = {
    course: CourseEntry
}
function CourseListItem(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                ...sx,
            }}
            {...other}
        />
    );
}
export default function CourseCard({ course }: CourseCardProps) {
    return <CourseListItem>
        <CardActionArea>
            <Card sx={{ width: 200, height: 100 }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {course.description}
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>

    </CourseListItem >
}