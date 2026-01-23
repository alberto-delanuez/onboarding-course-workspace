
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyQuery } from '../queries/use-verify-query';
import { CircularProgress, Box, Typography } from '@mui/material';

export const AuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const hasCode = searchParams.has('code');
    const hasState = searchParams.has('state');

    // If we have code/state, we are in the middle of a social login callback.
    // The auth client should automatically handle this, but it might take a moment.
    const isProcessingCallback = hasCode || hasState;

    // Use a dummy token to trigger the verification which checks the session via cookie
    const { data: user, isError } = useVerifyQuery({
        retry: isProcessingCallback ? 10 : 1,
        retryDelay: 1000,
        refetchOnWindowFocus: !isProcessingCallback,
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('token', user.accessToken);
            navigate('/dashboard');
        } else if (isError) {
            // Optional: Show a toast or error message
            navigate('/login');
        }
    }, [user, isError, navigate]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {isProcessingCallback ? 'Completing authentication...' : 'Checking session...'}
            </Typography>
        </Box>
    );
};
