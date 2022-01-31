import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import React, { useContext } from "react";
import { CourseListContext } from "../../course-list/application/context/course-list.context";
import { container, TOKENS } from "../../service_locator";

type CouseCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function CourseCreateDialog({ open, setOpen }: CouseCreateDialogProps) {

    const usecase = container.get(TOKENS.courseCreateUsecase);
    const { addCourse } = useContext(CourseListContext);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = form.get('name') as string;
        const description = form.get('description') as string;

        const result = await usecase.execute({ entity: { name, description } });

        handleClose();
        addCourse(result);
    }


    return <Dialog open={open} onClose={handleClose}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <DialogTitle>Create Course</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            defaultValue={''}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Box>
    </Dialog>
}