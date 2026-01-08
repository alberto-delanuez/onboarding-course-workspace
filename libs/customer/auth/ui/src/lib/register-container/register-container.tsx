import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHttpRepository } from '@onboarding-course/customer-auth-infrastructure';
import { RegisterUseCase } from '@onboarding-course/customer-auth-application';
import { RegisterDto } from '@onboarding-course/customer-auth-domain';
import { RegisterForm } from '../register-form/register-form';

export const RegisterContainer: React.FC<{ apiUrl?: string }> = ({ apiUrl = 'https://dummyjson.com/auth/login' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authRepository = new AuthHttpRepository(apiUrl);
  const registerUseCase = new RegisterUseCase(authRepository);

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
