import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoginDto } from '@onboarding-course/customer-auth-domain';

export interface LoginFormProps {
  onSubmit: (credentials: LoginDto) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error = null }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="string"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register">
                Register
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
