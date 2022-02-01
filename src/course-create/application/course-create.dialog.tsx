import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SnackbarContext } from "../../core/application/snackbar";
import { CourseListContext } from "../../course-list/application/context/course-list.context";
import { CourseEntry } from "../../course-list/domain/course-list-entry.entity";
import { container, TOKENS } from "../../service_locator";
import { CourseCreateParams } from "../domain/course-create.usecase";
import useCourseListBridge from "./course-list.bridge";
import CourseListBridge from "./course-list.bridge";

type CouseCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function CourseCreateDialog({ open, setOpen }: CouseCreateDialogProps) {
    const useBridge = useCourseListBridge();
    const snackbar = useContext(SnackbarContext);
    const usecase = container.get(TOKENS.courseCreateUsecase);
    const handleClose = () => {
        setOpen(false);
    };

    const mutation = useMutation((params: CourseCreateParams) => usecase.execute(params), {
        onSuccess: (data) => {
            // bridge to course-list feature
            useBridge.connect(data);
            // queryClient.setQueryData('course-list', (old: CourseEntry[]) => [...old, data]);
            // alternatively invalidate, will refetch all data
            // queryClient.invalidateQueries('course-list')
            handleClose();
            snackbar.openSnackbar({ msg: 'Successfully created', severity: 'success' })
        },
    })
    // 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = form.get('name') as string;
        const description = form.get('description') as string;

        // const result = await usecase.execute({ entity: { name, description } });
        mutation.mutate({ entity: { name, description } });
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