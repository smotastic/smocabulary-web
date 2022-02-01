import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CourseDetailEntity } from "../domain/course-detail.entity";
import CardCreateBridge from "./card-create.bridge";
import useLearnBridge from "./learn.bridge";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type CourseDetailViewProps = {
    course: CourseDetailEntity
}

const columns: GridColDef[] = [
    {
        field: 'question',
        headerName: 'Question',
        width: 200,
    },
    {
        field: 'answer',
        headerName: 'Answer',
        width: 200,
    },

];

export default function CourseDetailView({ course }: CourseDetailViewProps) {
    const learnBridge = useLearnBridge();

    return <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography component="h1" variant="h5">
                {course.name}
            </Typography>
            <Box>
                <IconButton aria-label="add" size="large" onClick={() => learnBridge.connect(course.id)}>
                    <PlayArrowIcon />
                </IconButton>
                <CardCreateBridge id={course.id} />
            </Box>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={course.cards}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>



    </>
}