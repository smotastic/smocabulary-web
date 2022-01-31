import * as React from 'react';
import { useRouter } from 'next/router';
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