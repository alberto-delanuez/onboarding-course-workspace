import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Paper, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { RegisterDto } from '@onboarding-course/customer-auth-domain';

export interface RegisterFormProps {
  onSubmit: (data: RegisterDto) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false, error = null }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, name, phone, address });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="grey.100">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e: any) => setEmail(e.target.value)} required disabled={isLoading} /> 
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e: any) => setPassword(e.target.value)} required disabled={isLoading} />
          <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e: any) => setName(e.target.value)} disabled={isLoading} />
          <TextField label="Phone" fullWidth margin="normal" value={phone} onChange={(e: any) => setPhone(e.target.value)} disabled={isLoading} />
          <TextField label="Address" fullWidth margin="normal" value={address} onChange={(e: any) => setAddress(e.target.value)} disabled={isLoading} />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{' '}
              <MuiLink component={Link} to="/login">
                Login
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
