export interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
}

export class UserModel {
    constructor(private readonly raw: User) {}

    static fromRaw(raw: User): UserModel {
        return new UserModel(raw);
    }

    toRaw(): User {
        return {
            id: this.raw.id,
            email: this.raw.email,
            name: this.raw.name,
            accessToken: this.raw.accessToken,
            refreshToken: this.raw.refreshToken
        };
    }

    get id(): string {
        return this.raw.id;
    }

    get email(): string {
        return this.raw.email;
    }

    get name(): string {
        return this.raw.name;
    }

    get accessToken(): string {
        return this.raw.accessToken;
    }

    get refreshToken(): string {
        return this.raw.refreshToken;
    }

    isAuthenticated(): boolean {
        return Boolean(this.raw.accessToken);
    }

    getDisplayName(): string {
        return this.raw.name || this.raw.email;
    }

    getUsernameFromEmail(): string {
        const localPart = this.raw.email.split('@')[0];

        if (!localPart) {
            throw new Error('Invalid email format: missing @ symbol');
        }

        const nameParts = localPart.split('.');

        if (nameParts.length < 2) {
            throw new Error(
                'Invalid email format: must contain firstname.lastname before @'
            );
        }

        const [firstName, lastName] = nameParts;

        if (!firstName || !lastName) {
            throw new Error(
                'Invalid email format: first name or last name is empty'
            );
        }

        const cleanFirstName = firstName.toLowerCase();
        const firstLetterOfLastName = lastName.charAt(0).toLowerCase();

        return cleanFirstName + firstLetterOfLastName;
    }
}
