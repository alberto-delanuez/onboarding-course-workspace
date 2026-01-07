import { http, HttpResponse } from 'msw';
import { UserProfile } from '@onboarding-course/customer-profile-domain';

export const mockUserProfile: UserProfile = {
    id: '1',
    username: 'user.test',
    firstName: 'User',
    lastName: 'Test',
    email: 'user.test@example.com',
    phone: '123456789',
    address: {
        address: '123 Main St',
        city: 'City',
        state: 'State',
        postalCode: '12345'
    }
};

export const mockGetProfileSuccess = http.get('*/auth/me', () =>
    HttpResponse.json(mockUserProfile)
);

export const mockGetProfileError = http.get('*/auth/me', () =>
    HttpResponse.json(null, { status: 500 })
);

export const mockUpdateProfileSuccess = http.put(
    '*/users/:id',
    async ({ request }) => {
        const body = (await request.json()) as Partial<UserProfile>;
        return HttpResponse.json({ ...mockUserProfile, ...body });
    }
);

export const mockUpdateProfileError = http.put('*/users/:id', () =>
    HttpResponse.json(null, { status: 500 })
);
