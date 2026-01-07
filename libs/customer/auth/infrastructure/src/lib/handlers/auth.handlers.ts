import { http, HttpResponse } from 'msw';
import { User } from '@onboarding-course/customer-auth-domain';

export const mockLoginUser: User = {
    id: '1',
    email: 'user.test@example.com',
    name: 'User Test',
    accessToken: 'token',
    refreshToken: 'refresh'
};

export const mockLoginSuccess = http.post('*/auth/login', () =>
    HttpResponse.json(mockLoginUser)
);

export const mockLoginError = http.post('*/auth/login', () =>
    HttpResponse.json(null, { status: 401 })
);
