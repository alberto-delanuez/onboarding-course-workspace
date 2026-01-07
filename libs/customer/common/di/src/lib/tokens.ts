import { DIToken } from './di-container';
import { AuthRepository } from '@onboarding-course/customer-auth-domain';
import { LoginUseCase } from '@onboarding-course/customer-auth-application';
import { RegisterUseCase } from '@onboarding-course/customer-auth-application';
import { VerifyUseCase } from '@onboarding-course/customer-auth-application';
import { SocialLoginUseCase } from '@onboarding-course/customer-auth-application';
import { RequestOtpUseCase } from '@onboarding-course/customer-auth-application';
import { LoginWithOtpUseCase } from '@onboarding-course/customer-auth-application';
import { ProfileRepository } from '@onboarding-course/customer-profile-domain';
import { GetProfileUseCase } from '@onboarding-course/customer-profile-application';
import { UpdateProfileUseCase } from '@onboarding-course/customer-profile-application';

// Auth Tokens
export const AuthRepositoryToken = new DIToken<AuthRepository>('AuthRepository');
export const LoginUseCaseToken = new DIToken<LoginUseCase>('LoginUseCase');
export const RegisterUseCaseToken = new DIToken<RegisterUseCase>('RegisterUseCase');
export const VerifyUseCaseToken = new DIToken<VerifyUseCase>('VerifyUseCase');
export const SocialLoginUseCaseToken = new DIToken<SocialLoginUseCase>('SocialLoginUseCase');
export const RequestOtpUseCaseToken = new DIToken<RequestOtpUseCase>('RequestOtpUseCase');
export const LoginWithOtpUseCaseToken = new DIToken<LoginWithOtpUseCase>('LoginWithOtpUseCase');

// Profile Tokens
export const ProfileRepositoryToken = new DIToken<ProfileRepository>('ProfileRepository');
export const GetProfileUseCaseToken = new DIToken<GetProfileUseCase>('GetProfileUseCase');
export const UpdateProfileUseCaseToken = new DIToken<UpdateProfileUseCase>('UpdateProfileUseCase');
