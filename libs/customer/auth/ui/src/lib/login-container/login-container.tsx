import { LoginUseCaseToken } from '@onboarding-course/customer-auth-application';
import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { LoginForm } from '../login-form/login-form';
import { useNavigate } from 'react-router-dom';
import { DIContainer } from '@onboarding-course/customer-common-di';


export const LoginContainer: React.FC = () => {
  const navigate = useNavigate();

  const loginUseCase = DIContainer.get(LoginUseCaseToken);

  const handleLogin = async (credentials: LoginDto) => {
    try {
      
      const user = await loginUseCase.execute(credentials);
      
      if(!user) {
        throw new Error('Invalid credentials');
      }
      localStorage.setItem('token', user.accessToken);    
      // Redirect to dashboard or any other protected route
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);     
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
    />
  );
};
