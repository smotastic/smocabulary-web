import { Box, Grid, Skeleton, TextField } from "@mui/material";

export default function CourseListLoading() {
    return <>
        <Grid container spacing={3} sx={{ p: 1, m: 1, }}>
            <Grid item xs={3}>
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
            </Grid>
        </Grid>
    </>
}