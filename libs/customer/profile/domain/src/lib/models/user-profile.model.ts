export interface UserProfile {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    address: Address;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    postalCode: string;
}

export class UserProfileModel {
    constructor(private readonly raw: UserProfile) {}

    static fromRaw(raw: UserProfile): UserProfileModel {
        return new UserProfileModel(raw);
    }

    toRaw(): UserProfile {
        return { ...this.raw };
    }

    get id(): string {
        return this.raw.id;
    }

    get username(): string {
        return this.raw.username;
    }

    get firstName(): string | undefined {
        return this.raw.firstName;
    }

    get lastName(): string | undefined {
        return this.raw.lastName;
    }

    get email(): string {
        return this.raw.email;
    }

    get phone(): string {
        return this.raw.phone;
    }

    get address(): Address {
        return this.raw.address;
    }

    get displayName(): string {
        if (!this.raw.firstName && !this.raw.lastName) return '-';
        return (
            [this.raw.firstName, this.raw.lastName].filter(Boolean).join(' ') ||
            '-'
        );
    }

    get fullAddress(): string {
        const address = this.raw.address;
        if (!address) return '-';
        const parts = [
            address.address,
            address.city,
            address.state,
            address.postalCode
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : '-';
    }

    get hasPhone(): boolean {
        return Boolean(this.raw.phone);
    }
}
