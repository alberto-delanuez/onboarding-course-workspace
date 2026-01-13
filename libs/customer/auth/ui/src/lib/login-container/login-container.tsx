import { LoginUseCaseToken, SocialLoginUseCaseToken, RequestOtpUseCaseToken, LoginWithOtpUseCaseToken } from '@onboarding-course/customer-auth-application';
import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { LoginForm } from './login-form/login-form';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { DIContainer } from '@onboarding-course/customer-common-di';
import { useLoginReducer } from './login-reducer/use-login-reducer';
import { Button, Stack, Typography, TextField, Box, Alert } from '@mui/material';
import { LoginState } from './login-reducer/reducer.types';
import { useMemo } from 'react';


interface LoginContainerProps {
  enableLogin?: boolean;
  enableSocialLogin?: boolean;
  enableOTP?: boolean;
}




export const LoginContainer: React.FC<LoginContainerProps> = ({ enableLogin = true, enableSocialLogin = false, enableOTP = false }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const initialState: LoginState = useMemo(() => ({
    mode: !enableLogin && enableOTP ? 'OTP_REQUEST' : 'PASSWORD',
    email: '',
    code: '',
    error: null,
}), [enableLogin, enableOTP]);

  const [state, dispatch] = useLoginReducer(
    initialState
  );

  const { mode, email, code, error } = state;

  const loginUseCase = DIContainer.get(LoginUseCaseToken);
  const socialLoginUseCase = DIContainer.get(SocialLoginUseCaseToken);
  const requestOtpUseCase = DIContainer.get(RequestOtpUseCaseToken);
  const loginWithOtpUseCase = DIContainer.get(LoginWithOtpUseCaseToken);

  const handleSuccess = (token: string) => {
    window.localStorage.setItem('token', token);    
    navigate('/dashboard');
  };

  const handleLogin = async (credentials: LoginDto) => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      const user = await loginUseCase.execute(credentials);
      if(!user) throw new Error('Invalid credentials');
      handleSuccess(user.accessToken);
    } catch (err: any) {
      console.error('Login error:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials or login failed' });
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      const user = await socialLoginUseCase.execute(provider, 'mock_token');
      handleSuccess(user.accessToken);
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
      await requestOtpUseCase.execute(email);
      dispatch({ type: 'OTP_SENT_SUCCESS' });
    } catch (err) {
      console.error('Request OTP error:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send OTP code' });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      if (!code) {
        dispatch({ type: 'SET_ERROR', payload: 'OTP Code is required' });
        return;
      }
      const user = await loginWithOtpUseCase.execute(email, code);
      if(!user) throw new Error('Invalid OTP code');
      handleSuccess(user.accessToken);
    } catch (err) {
      console.error('Verify OTP error:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Invalid OTP code' });
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
      {mode === 'PASSWORD' && enableLogin && (
        <>
          <Typography variant="h5" gutterBottom align="center">
            {intl.formatMessage({ id: 'login.title', defaultMessage: 'Login' })}
          </Typography>
          <LoginForm onSubmit={handleLogin} />
          
          {enableOTP && (
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
      {/* SOCIAL LOGIN SECTION (Always visible if enabled, or maybe conditional based on design?) */}
      {mode === 'PASSWORD' && enableSocialLogin && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography variant="body2" align="center">
            {intl.formatMessage({ id: 'login.with.social', defaultMessage: 'Or login with' })}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={() => handleSocialLogin('google')}>Google</Button>
            <Button variant="outlined" onClick={() => handleSocialLogin('facebook')}>Facebook</Button>
          </Stack>
        </Stack>
      )}

      {/* OTP REQUEST MODE */}
      {mode === 'OTP_REQUEST' && enableOTP && (
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
            
            {enableLogin && (
              <Button variant="text" onClick={() => dispatch({ type: 'SWITCH_TO_PASSWORD' })}>
                Back to Password Login
              </Button>
            )}
          </Stack>
        </Box>
      )}

      {/* OTP VERIFY MODE */}
      {mode === 'OTP_VERIFY' && enableOTP && (
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
