import { Box, BoxProps, Grid, IconButton, Paper, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LearnCard } from "../domain/learn.entity";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckIcon from '@mui/icons-material/Check';
type LearnViewProps = {
    cards: LearnCard[]
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
    },
});
function LearnItem(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                my: 4,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...sx,
            }}
            {...other}
        />
    );
}

export default function LearnView({ cards }: LearnViewProps) {

    const [currentCard, setCurrentCard] = useState<LearnCard>(undefined);
    const [counter, setCounter] = useState(0);

    const [givenAnswer, setGivenAnswer] = useState('');
    const [answerGiven, setAnswerGiven] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(true);

    useEffect(() => {
        if (counter >= cards.length) {
            // STOP LEARNING
            setCounter(0);
        } else {
            setCurrentCard(cards[counter]);
            setGivenAnswer('');
            setAnswerCorrect(true);
            setAnswerGiven(false);
        }
    }, [counter])


    const onSubmitHandler = () => {
        setAnswerCorrect(currentCard.answer === givenAnswer);
        setAnswerGiven(true);
    }

    const onNextCard = () => {
        setCounter((old) => old + 1);
    }

    return <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', }}>
            {currentCard &&
                <>
                    <Grid item xs={12} component={Paper} elevation={2} >
                        <LearnItem >
                            <Typography component="h1" variant="h5">
                                {currentCard.question}
                            </Typography>
                        </LearnItem>
                    </Grid>
                    <Grid container component={Paper} elevation={6} >
                        <Grid item xs={11} >
                            <LearnItem>
                                <TextField
                                    sx={answerCorrect && answerGiven ? { border: '1px solid green' } : {}}
                                    error={!answerCorrect}
                                    fullWidth
                                    id="answer"
                                    label="Answer"
                                    name="answer"
                                    required
                                    value={givenAnswer}
                                    onChange={(event) => setGivenAnswer(event.target.value)}
                                />
                            </LearnItem>

                        </Grid>
                        <Grid item xs={1} >
                            <LearnItem>
                                {answerGiven
                                    ? <IconButton size="large" type="button" onClick={onNextCard}>
                                        <CheckIcon />
                                    </IconButton>
                                    : <IconButton size="large" type="button" onClick={onSubmitHandler}>
                                        <ThumbUpAltIcon />
                                    </IconButton>}
                            </LearnItem>
                        </Grid>
                    </Grid>

                    {answerGiven &&
                        <Grid item xs={12} >
                            <LearnItem>
                                <Typography component="h1" variant="h5">
                                    {currentCard.answer}
                                </Typography>
                            </LearnItem>
                        </Grid>
                    }

                </>
            }
        </Box>
    </>

}