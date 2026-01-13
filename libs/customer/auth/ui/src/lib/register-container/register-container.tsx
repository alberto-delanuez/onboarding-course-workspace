import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUseCaseToken } from '@onboarding-course/customer-auth-application';
import { RegisterDto } from '@onboarding-course/customer-auth-domain';
import { RegisterForm } from '../register-form/register-form';
import { DIContainer } from '@onboarding-course/customer-common-di';

export const RegisterContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const registerUseCase = DIContainer.get(RegisterUseCaseToken);

  const handleRegister = async (data: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUseCase.execute(data);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />;
};
