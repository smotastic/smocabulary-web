import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { SnackbarContext } from "../../core/application/snackbar";
import { container, TOKENS } from "../../service_locator";
import { CourseCreateParams } from "../domain/course-create.usecase";
import useCourseListBridge from "./course-list.bridge";

type CouseCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function CourseCreateDialog({ open, setOpen }: CouseCreateDialogProps) {
    const useCourseList = useCourseListBridge();
    const snackbar = useContext(SnackbarContext);
    const usecase = container.get(TOKENS.courseCreateUsecase);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
    };

    const mutation = useMutation((params: CourseCreateParams) => usecase.execute(params), {
        onSuccess: (data) => {
            // bridge to course-list feature
            useCourseList.connect(data);
            // queryClient.setQueryData('course-list', (old: CourseEntry[]) => [...old, data]);
            // alternatively invalidate, will refetch all data
            // queryClient.invalidateQueries('course-list')
            handleClose();
            snackbar.openSnackbar({ msg: 'Successfully created', severity: 'success' })
        },
    })


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = form.get('name') as string;
        const description = form.get('description') as string;

        mutation.mutate({ entity: { name, description } });
    }

    return <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth='md' fullWidth={true}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <DialogTitle>Create Course</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
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
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            multiline={true}
                            rows={5}
                            id="description"
                            label="Description"
                            name="description"
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