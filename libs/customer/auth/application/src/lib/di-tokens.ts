import { DIToken } from '@onboarding-course/customer-common-di';
import { AuthRepository } from '@onboarding-course/customer-auth-domain';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { VerifyUseCase } from './use-cases/verify.use-case';
import { SocialLoginUseCase } from './use-cases/social-login.use-case';
import { RequestOtpUseCase } from './use-cases/request-otp.use-case';
import { LoginWithOtpUseCase } from './use-cases/login-with-otp.use-case';

export const AuthRepositoryToken = new DIToken<AuthRepository>('AuthRepository');
export const LoginUseCaseToken = new DIToken<LoginUseCase>('LoginUseCase');
export const RegisterUseCaseToken = new DIToken<RegisterUseCase>('RegisterUseCase');
export const VerifyUseCaseToken = new DIToken<VerifyUseCase>('VerifyUseCase');
export const SocialLoginUseCaseToken = new DIToken<SocialLoginUseCase>('SocialLoginUseCase');
export const RequestOtpUseCaseToken = new DIToken<RequestOtpUseCase>('RequestOtpUseCase');
export const LoginWithOtpUseCaseToken = new DIToken<LoginWithOtpUseCase>('LoginWithOtpUseCase');
