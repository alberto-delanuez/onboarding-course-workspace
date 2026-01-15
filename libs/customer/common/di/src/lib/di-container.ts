export class DIToken<T> {
    constructor(public readonly key: string) {}
}

export class DIContainer {
    private static registry = new Map<string, any>();

    static set<T>(token: DIToken<T>, value: T): void {
        this.registry.set(token.key, value);
    }

    static get<T>(token: DIToken<T>): T {
        const value = this.registry.get(token.key);
        if (!value) {
            throw new Error(`Dependency not found: ${token.key}`);
        }
        return value;
    }

    static clear(): void {
        this.registry.clear();
    }
}
