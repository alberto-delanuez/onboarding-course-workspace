import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import { RegisterDto } from '@onboarding-course/customer-auth-domain';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export interface RegisterFormProps {
  onSubmit: (data: RegisterDto) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const intl = useIntl();
  return (
    <Box display="flex" justifyContent="center" minHeight="100vh" bgcolor="grey.100">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Register form (coming soon...)
        </Typography>
        <Typography variant="body2" align="center">
          {intl.formatMessage({ id: 'customer.auth.register.login.link', defaultMessage: 'Already have an account? {link}' }, { link: (
                <MuiLink component={Link} to="/login">
                  {intl.formatMessage({ id: 'customer.auth.register.login', defaultMessage: 'Login' })}
                </MuiLink>
              ) })}
        </Typography>
      </Paper>
    </Box>
  );
};
