import { RegisterDto } from '@onboarding-course/customer-auth-domain';
import { RegisterForm } from './register-form/register-form';

export const RegisterContainer: React.FC = () => {

  const handleRegister = async (data: RegisterDto) => {
    console.log('Registering user:', data);
  };

  return <RegisterForm onSubmit={handleRegister} />;
};
