import { DIContainer } from '@onboarding-course/customer-common-di';
import { 
  AuthRepositoryToken, 
  LoginUseCaseToken, 
  RegisterUseCaseToken, 
  VerifyUseCaseToken, 
  SocialLoginUseCaseToken, 
  RequestOtpUseCaseToken, 
  LoginWithOtpUseCaseToken, 
  LoginUseCase, 
  RegisterUseCase, 
  VerifyUseCase, 
  SocialLoginUseCase, 
  RequestOtpUseCase, 
  LoginWithOtpUseCase 
} from '@onboarding-course/customer-auth-application';
import { AuthHttpRepository } from '@onboarding-course/customer-auth-infrastructure';
import { 
  ProfileRepositoryToken, 
  GetProfileUseCaseToken, 
  UpdateProfileUseCaseToken, 
  GetProfileUseCase, 
  UpdateProfileUseCase 
} from '@onboarding-course/customer-profile-application';
import { ProfileHttpRepository } from '@onboarding-course/customer-profile-infrastructure';

export interface AppConfig {
  title: string;
  apiUrl: string;
  defaultLocale: string;
  enableLogin: boolean;
  enableSocialLogin: boolean;
  enableOTP: boolean;
}

export class CustomerAppBuilder {
  private config: AppConfig;

  constructor() {
    this.config = {
      title: 'Customer App',
      apiUrl: 'https://dummyjson.com',
      defaultLocale: 'en',
      enableLogin: true,
      enableSocialLogin: false,
      enableOTP: false
    };
  }

  public withTitle(title: string): CustomerAppBuilder {
    this.config.title = title;
    return this;
  }

  public withApiUrl(url: string): CustomerAppBuilder {
    this.config.apiUrl = url;
    return this;
  }

  public withDefaultLocale(locale: string): CustomerAppBuilder {
    this.config.defaultLocale = locale;
    return this;
  }

  public disableLogin(): CustomerAppBuilder {
    this.config.enableLogin = false;
    return this;
  }

  public withSocialLogin(): CustomerAppBuilder {
    this.config.enableSocialLogin = true;
    return this;
  }

  public withOTP(): CustomerAppBuilder {
    this.config.enableOTP = true;
    return this;
  }

  public withAuthModule(): CustomerAppBuilder {
    const authRepo = new AuthHttpRepository(this.config.apiUrl);
    
    DIContainer.set(AuthRepositoryToken, authRepo);
    DIContainer.set(LoginUseCaseToken, new LoginUseCase(authRepo));
    DIContainer.set(RegisterUseCaseToken, new RegisterUseCase(authRepo));
    DIContainer.set(VerifyUseCaseToken, new VerifyUseCase(authRepo));
    DIContainer.set(SocialLoginUseCaseToken, new SocialLoginUseCase(authRepo));
    DIContainer.set(RequestOtpUseCaseToken, new RequestOtpUseCase(authRepo));
    DIContainer.set(LoginWithOtpUseCaseToken, new LoginWithOtpUseCase(authRepo));
    
    return this;
  }

  public withProfileModule(): CustomerAppBuilder {
    const profileRepo = new ProfileHttpRepository(this.config.apiUrl);
    
    DIContainer.set(ProfileRepositoryToken, profileRepo);
    DIContainer.set(GetProfileUseCaseToken, new GetProfileUseCase(profileRepo));
    DIContainer.set(UpdateProfileUseCaseToken, new UpdateProfileUseCase(profileRepo));
    
    return this;
  }

  public build(): AppConfig {
    return this.config;
  }
}
