import { ListItemButton, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CourseCreateDialog from "../../course-create/application/course-create.dialog";
export default function CourseCreateBridge() {

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