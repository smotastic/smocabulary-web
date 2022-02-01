import { Box, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CourseDetailEntity } from "../domain/course-detail.entity";
import AddIcon from '@mui/icons-material/Add';
import CardCreateBridge from "./card-create.bridge";

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
    return <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography component="h1" variant="h5">
                {course.name}
            </Typography>
            <CardCreateBridge id={course.id} />
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