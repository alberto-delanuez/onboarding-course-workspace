import { describe, it, expect } from 'vitest';
import { UserModel } from './user.model';

describe('UserModel', () => {
    it('getUsernameFromEmail should return first name + first letter of last name in lowercase', () => {
        const model = new UserModel({
            id: '1',
            email: 'test.user@example.com',
            name: 'Test User',
            accessToken: 'token',
            refreshToken: 'refresh'
        });

        const username = model.getUsernameFromEmail();

        expect(username).toBe('testu');
    });

    it('isAuthenticated should return true when accessToken is present', () => {
        const model = new UserModel({
            id: '1',
            email: 'test.user@example.com',
            name: 'Test User',
            accessToken: 'token',
            refreshToken: 'refresh'
        });

        expect(model.isAuthenticated()).toBe(true);
    });

    it('isAuthenticated should return false when accessToken is empty', () => {
        const model = new UserModel({
            id: '1',
            email: 'test.user@example.com',
            name: 'Test User',
            accessToken: '',
            refreshToken: ''
        });

        expect(model.isAuthenticated()).toBe(false);
    });

    it('getDisplayName should return name if present', () => {
        const model = new UserModel({
            id: '1',
            email: 'test.user@example.com',
            name: 'Test User',
            accessToken: 'token',
            refreshToken: 'refresh'
        });

        expect(model.getDisplayName()).toBe('Test User');
    });

    it('getDisplayName should return email if name is empty', () => {
        const model = new UserModel({
            id: '1',
            email: 'test.user@example.com',
            name: '',
            accessToken: 'token',
            refreshToken: 'refresh'
        });

        expect(model.getDisplayName()).toBe('test.user@example.com');
    });
});
