import { describe, it, expect } from 'vitest';
import { UserProfileModel, UserProfile } from './user-profile.model';

const createProfile = (
    overrides: Partial<UserProfile> = {}
): UserProfile => ({
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
    },
    ...overrides
});

describe('UserProfileModel', () => {
    it('should expose raw data through getters', () => {
        const raw = createProfile();
        const model = UserProfileModel.fromRaw(raw);

        expect(model.id).toBe(raw.id);
        expect(model.username).toBe(raw.username);
        expect(model.firstName).toBe(raw.firstName);
        expect(model.lastName).toBe(raw.lastName);
        expect(model.email).toBe(raw.email);
        expect(model.phone).toBe(raw.phone);
        expect(model.address).toEqual(raw.address);
        expect(model.toRaw()).toEqual(raw);
    });

    it('displayName should be full name when first and last name are present', () => {
        const model = UserProfileModel.fromRaw(
            createProfile({
                firstName: 'Jane',
                lastName: 'Doe'
            })
        );

        expect(model.displayName).toBe('Jane Doe');
    });

    it('displayName should handle missing first or last name', () => {
        const onlyFirst = UserProfileModel.fromRaw(
            createProfile({
                firstName: 'Jane',
                lastName: undefined
            })
        );
        const onlyLast = UserProfileModel.fromRaw(
            createProfile({
                firstName: undefined,
                lastName: 'Doe'
            })
        );

        expect(onlyFirst.displayName).toBe('Jane');
        expect(onlyLast.displayName).toBe('Doe');
    });

    it('displayName should fallback to "-" when both names are missing', () => {
        const model = UserProfileModel.fromRaw(
            createProfile({
                firstName: undefined,
                lastName: undefined
            })
        );

        expect(model.displayName).toBe('-');
    });

    it('fullAddress should join non-empty address parts with comma', () => {
        const model = UserProfileModel.fromRaw(
            createProfile({
                address: {
                    address: '123 Main St',
                    city: 'City',
                    state: 'State',
                    postalCode: '12345'
                }
            })
        );

        expect(model.fullAddress).toBe('123 Main St, City, State, 12345');
    });

    it('fullAddress should ignore empty address fields', () => {
        const model = UserProfileModel.fromRaw(
            createProfile({
                address: {
                    address: '123 Main St',
                    city: '',
                    state: '',
                    postalCode: '12345'
                }
            })
        );

        expect(model.fullAddress).toBe('123 Main St, 12345');
    });

    it('fullAddress should return "-" when address is missing or empty', () => {
        const modelWithNoAddress = UserProfileModel.fromRaw(
            createProfile({
                address: undefined as unknown as any
            })
        );
        const modelWithEmptyAddress = UserProfileModel.fromRaw(
            createProfile({
                address: {
                    address: '',
                    city: '',
                    state: '',
                    postalCode: ''
                }
            })
        );

        expect(modelWithNoAddress.fullAddress).toBe('-');
        expect(modelWithEmptyAddress.fullAddress).toBe('-');
    });

    it('hasPhone should be true when phone is present', () => {
        const model = UserProfileModel.fromRaw(
            createProfile({
                phone: '123456789'
            })
        );

        expect(model.hasPhone).toBe(true);
    });

    it('hasPhone should be false when phone is empty', () => {
        const model = UserProfileModel.fromRaw(
            createProfile({
                phone: ''
            })
        );

        expect(model.hasPhone).toBe(false);
    });
});

