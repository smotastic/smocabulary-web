import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CardCreateDialog from '../../card-create/application/card-create.dialog';

type CardCreateBridgeProps = {
    id: string
}

export default function CardCreateBridge({ id }: CardCreateBridgeProps) {
    const [open, setOpen] = useState(false);

    return <>
        <IconButton aria-label="delete" size="large" onClick={() => setOpen(true)}>
            <AddIcon />
        </IconButton>
        <CardCreateDialog open={open} setOpen={setOpen} id={id} />
    </>
}