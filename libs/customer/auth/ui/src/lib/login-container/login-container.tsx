import { useLoginMutation } from '../queries/use-login-mutation';
import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { LoginForm } from './login-form/login-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useLoginReducer } from './login-reducer/use-login-reducer';
import { Button, Stack, Typography, TextField, Box, Alert } from '@mui/material';
import { LoginState } from './login-reducer/use-login-reducer.types';
import { useMemo } from 'react';


import { OTPConfig, SocialLoginConfig, LoginConfig } from '@onboarding-course/customer-common-utils';
import { useSocialLoginMutation } from '../queries/use-social-login-mutation';
import { useRequestOtpMutation } from '../queries/use-request-otp-mutation';
import { useLoginWithOtpMutation } from '../queries/use-login-with-otp-mutation';

interface LoginContainerProps {
  login?: LoginConfig;
  socialLogin?: SocialLoginConfig;
  otp?: OTPConfig;
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ login = { enabled: true }, socialLogin = { enabled: false }, otp = { enabled: false } }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const initialState: LoginState = useMemo(() => ({
    mode: !login.enabled && otp.enabled ? 'OTP_REQUEST' : 'PASSWORD',
    email: '',
    code: '',
    error: null,
}), [login, otp]);

  const [state, dispatch] = useLoginReducer(
    initialState
  );

  const { mode, email, code, error } = state;

  const handleSuccess = (token: string) => {
    window.localStorage.setItem('token', token);    
    navigate('/dashboard');
  };

  const loginAsync = useLoginMutation({
        onSuccess: ({accessToken}) => handleSuccess(accessToken),
        onError: () => {
          dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials or login failed' });
          throw new Error('Invalid credentials');
        }
  });

  const socialLoginAsync = useSocialLoginMutation({
        onSuccess: ({accessToken}) => handleSuccess(accessToken),
        onError: () => {
          dispatch({ type: 'SET_ERROR', payload: 'Social login failed' });
          throw new Error('Social login failed');
        }
  });

  const requestOtpAsync = useRequestOtpMutation({
        onSuccess: () => {
            dispatch({ type: 'OTP_SENT_SUCCESS' });
        },
        onError: () => {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to send OTP code' });
            throw new Error('Failed to send OTP code');
        }
  });

  const loginWithOtpAsync = useLoginWithOtpMutation({
        onSuccess: ({accessToken}) => handleSuccess(accessToken),
        onError: () => {
            dispatch({ type: 'SET_ERROR', payload: 'Invalid OTP code' });
            throw new Error('Invalid OTP code');
        }
  });

  const handleLogin = async (credentials: LoginDto) => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });

      await loginAsync(credentials);
     
    } catch (err) {
      console.error('Login error:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials or login failed' });
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await socialLoginAsync(provider);
    } catch (err) {
      console.error('Social login error:', err);
      dispatch({ type: 'SET_ERROR', payload: `Social login with ${provider} failed` });
    }
  };

  const handleRequestOtp = async () => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      if (!email) {
        dispatch({ type: 'SET_ERROR', payload: 'Email is required' });
        return;
      }
      await requestOtpAsync(email);
    } catch (err) {
      console.error('Request OTP error:', err);
      // Error handling is done in mutation onError
    }
  };

  const handleVerifyOtp = async () => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      if (!code) {
        dispatch({ type: 'SET_ERROR', payload: 'OTP Code is required' });
        return;
      }
      await loginWithOtpAsync({ email, code });
    } catch (err) {
      console.error('Verify OTP error:', err);
      // Error handling is done in mutation onError
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* PASSWORD MODE */}
      {mode === 'PASSWORD' && login.enabled && (
        <>
          <Typography variant="h5" gutterBottom align="center">
            {intl.formatMessage({ id: 'login.title', defaultMessage: 'Login' })}
          </Typography>
          <LoginForm onSubmit={handleLogin} />
          
          {otp.enabled && (
            <Button 
              fullWidth 
              variant="text" 
              sx={{ mt: 2 }} 
              onClick={() => dispatch({ type: 'SWITCH_TO_OTP' })}
            >
              {intl.formatMessage({ id: 'login.with.otp', defaultMessage: 'Login with OTP' })}
            </Button>
          )}
        </>
      )}
      {/* SOCIAL LOGIN SECTION */}
      {mode === 'PASSWORD' && socialLogin.enabled && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography variant="body2" align="center">
            {intl.formatMessage({ id: 'login.with.social', defaultMessage: 'Or login with' })}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {socialLogin.providers.map((provider) => (
              <Button key={provider} variant="outlined" onClick={() => handleSocialLogin(provider)}>
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </Button>
            ))}
          </Stack>
        </Stack>
      )}

      {/* OTP REQUEST MODE */}
      {mode === 'OTP_REQUEST' && otp.enabled && (
        <Box>
          <Typography variant="h5" gutterBottom>Login with OTP</Typography>
          <Stack spacing={2}>
            <TextField 
              label="Email" 
              value={email} 
              onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} 
              fullWidth
            />
            <Button variant="contained" onClick={handleRequestOtp} fullWidth>Send Code</Button>
            
            {login.enabled && (
              <Button variant="text" onClick={() => dispatch({ type: 'SWITCH_TO_PASSWORD' })}>
                Back to Password Login
              </Button>
            )}
          </Stack>
        </Box>
      )}
      {/* OTP VERIFY MODE */}
      {mode === 'OTP_VERIFY' && otp.enabled && (
        <Box>
          <Typography variant="h5" gutterBottom>Verify OTP</Typography>
          <Stack spacing={2}>
            <Typography variant="body2">Code sent to {email}</Typography>
            <TextField 
              label="OTP Code" 
              value={code}
              onChange={(e) => dispatch({ type: 'SET_CODE', payload: e.target.value })} 
              fullWidth
            />
            <Button variant="contained" onClick={handleVerifyOtp} fullWidth>Verify & Login</Button>
            <Button variant="text" onClick={() => dispatch({ type: 'SWITCH_TO_OTP_REQUEST' })}>
              Back to Email
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
