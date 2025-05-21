'use client';

import { Button, Link, Stack, TextField } from '@mui/material';
import NextLink from 'next/link';
import createUser from './create-user';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [state, formAction] = useActionState(createUser, { error: '' });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/');
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className='w-full max-w-xs'>
      <Stack spacing={2}>
        <TextField
          name='email'
          label='Email'
          variant='outlined'
          type='email'
          error={!!state.error}
          helperText={state.error && state.error.includes('email') ? state.error : ''}
        />
        <TextField
          name='password'
          label='Password'
          variant='outlined'
          type='password'
          error={!!state.error}
          helperText={state.error && state.error.includes('password') ? state.error : ''}
        />
        {state.error && !state.error.includes('email') && !state.error.includes('password') && (
          <div className='text-red-500 text-sm'>{state.error}</div>
        )}
        <Button type='submit' variant='contained'>
          Signup
        </Button>
        <Link component={NextLink} href='/auth/login' className='self-center'>
          Login
        </Link>
      </Stack>
    </form>
  );
}
