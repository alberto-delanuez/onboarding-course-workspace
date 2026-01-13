import { LoginUseCase } from '@onboarding-course/customer-auth-application';
import { AuthHttpRepository } from '@onboarding-course/customer-auth-infrastructure';
import { LoginDto } from '@onboarding-course/customer-auth-domain';
import { LoginForm } from '../login-form/login-form';
import { useNavigate } from 'react-router-dom';


export const LoginContainer: React.FC<{ apiUrl: string }> = ({ apiUrl = 'https://dummyjson.com/auth/login' }) => {
  const navigate = useNavigate();

  const authRepository = new AuthHttpRepository(apiUrl);
  const loginUseCase = new LoginUseCase(authRepository);

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
