import { Box, Button, TextField, Typography, Paper, Link as MuiLink, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { useIntl } from 'react-intl';
import { Controller } from 'react-hook-form';
import { useLoginForm } from './form/use-login-form';


export interface LoginFormProps {
  onSubmit: (credentials: LoginDto) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const intl = useIntl();

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useLoginForm();
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.100"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {intl.formatMessage({ id: 'customer.auth.login.title', defaultMessage: 'Login' })}
        </Typography>


        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller 
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={intl.formatMessage({ id: 'customer.auth.login.email', defaultMessage: 'Email' })}
                type="text"
                fullWidth
                margin="normal"            
                disabled={isSubmitting}
                data-hook="email"
              />
            )}
          />
          {errors.email && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {errors.email.message}
            </Alert>        
          )}
          <Controller 
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={intl.formatMessage({ id: 'customer.auth.login.password', defaultMessage: 'Password' })}
                type="password"
                fullWidth
                margin="normal"
                disabled={isSubmitting}
                data-hook="password"
              />
            )}
          />
          {errors.password && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {errors.password.message}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
            data-hook="submit"
          >
            {isSubmitting ? intl.formatMessage({ id: 'customer.auth.login.loading', defaultMessage: 'Logging in...' }) : intl.formatMessage({ id: 'customer.auth.login.submit', defaultMessage: 'Submit' })}
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              {intl.formatMessage({ id: 'customer.auth.login.register.link', defaultMessage: "Don't have an account?" }, { link: <MuiLink component={Link} to="/register">{intl.formatMessage({ id: 'customer.auth.login.register', defaultMessage: 'Register' }) }</MuiLink> } )}
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
