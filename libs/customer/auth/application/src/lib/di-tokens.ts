import { DIToken } from '@onboarding-course/customer-common-di';
import { AuthRepository } from '@onboarding-course/customer-auth-domain';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { VerifyUseCase } from './use-cases/verify.use-case';

export const AuthRepositoryToken = new DIToken<AuthRepository>('AuthRepository');
export const LoginUseCaseToken = new DIToken<LoginUseCase>('LoginUseCase');
export const RegisterUseCaseToken = new DIToken<RegisterUseCase>('RegisterUseCase');
export const VerifyUseCaseToken = new DIToken<VerifyUseCase>('VerifyUseCase');
