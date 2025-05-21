'use client';

import { Button, Stack, TextField, Link } from '@mui/material';
import NextLink from 'next/link';
import login from './login';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const [state, formAction] = useActionState(login, { error: '' });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push('/');
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className='w-full max-w-xs'>
      <Stack spacing={2} className='w-full max-w-xs'>
        <TextField
          error={!!state.error && state.error.includes('email')}
          helperText={state.error && state.error.includes('email') ? state.error : ''}
          name='email'
          label='Email'
          variant='outlined'
          type='email'
        />
        <TextField
          error={!!state.error && state.error.includes('password')}
          helperText={state.error && state.error.includes('password') ? state.error : ''}
          name='password'
          label='Password'
          variant='outlined'
          type='password'
        />
        {state.error && !state.error.includes('email') && !state.error.includes('password') && (
          <div className='text-red-500 text-sm'>{state.error}</div>
        )}
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
        <Link component={NextLink} href='/auth/signup' className='self-center'>
          Signup
        </Link>
      </Stack>
    </form>
  );
}
