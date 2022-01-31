import { BoxProps, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import router from "next/router";
import { pagePath } from "../../../utils/page.path";
import { CourseEntry } from "../domain/course-list-entry.entity";

function Item(props: BoxProps) {
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


type CourseCardProps = {
    course: CourseEntry
}

export default function CourseCard({ course }: CourseCardProps) {
    return <Item>
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

    </Item >
}