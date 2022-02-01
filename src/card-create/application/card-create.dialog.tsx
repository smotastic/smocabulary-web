import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { useMutation } from "react-query";
import { SnackbarContext } from "../../core/application/snackbar";
import useCourseDetailBridge from "./course-detail.bridge"
import { container, TOKENS } from "../../service_locator";
import { CardCreateParams } from "../domain/card-create.usecase";

type CardCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    id: string
}

export default function CardCreateDialog({ open, setOpen, id }: CardCreateDialogProps) {
    const useCourseDetail = useCourseDetailBridge();
    const snackbar = useContext(SnackbarContext);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const usecase = container.get(TOKENS.cardCreateUsecase);
    const mutation = useMutation((params: CardCreateParams) => usecase.execute(params), {

        onSuccess: (data) => {
            // bridge to course-list feature
            useCourseDetail.connect(data);
            handleClose();
            snackbar.openSnackbar({ msg: 'Successfully created', severity: 'success' })
        },
    })
    const handleClose = () => {
        setOpen(false);
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const question = form.get('question') as string;
        const answer = form.get('answer') as string;


        mutation.mutate({ entity: { course_id: id, question, answer } });
    }

    return <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth='md' fullWidth={true}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <DialogTitle>Create Card for Course</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="question"
                            label="Question"
                            name="question"
                            autoFocus
                            defaultValue={''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="answer"
                            label="Answer"
                            name="answer"
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