import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import AuthView from './auth.view';


export default function AuthContainer() {

    const [error, setError] = useState('');

    const { data, status } = useSession();

    useEffect(() => {
        if (data) {
            router.replace('/');
        }
    }, [data]);

    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password')


        const result: any = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });

        if (result!.error) {
            setError('Invalid Credentials');
        } else {
            router.push('/');
        }

        return false;

    };

    return (
        <AuthView onSubmitHandler={handleSubmit} error={error} />
    );
}