import { ListItemButton, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CourseCreateDialog from './course-create.dialog';
export default function DashboardCourseCreateBridge() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItemButton onClick={() => setOpen(true)}>
                <ListItemText primary={'Create'} />
                <AddIcon />
            </ListItemButton>
            <CourseCreateDialog open={open} setOpen={setOpen} />
        </>
    )
}