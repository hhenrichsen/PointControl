import { Service } from 'typedi';

@Service()
export class Environment {
    protected readonly underlying: { [key: string]: string | undefined } =
        process.env;

    /**
     * Get a raw value from the environment. Returns undefined if the value does not exist.
     *
     * @param key The key to get from the environment.
     */
    public getOpt(key: string): string | undefined;

    /**
     * Get a parsed value from the environment. Returns undefined if the value does not exist.
     *
     * @param key The key to get from the environment.
     * @param parser The function with which to parse the value.
     */
    public getOpt<T>(key: string, parser: (value: string) => T): T | undefined;
    public getOpt<T>(
        key: string,
        parser?: (value: string) => T
    ): T | string | undefined {
        const value = this.underlying[key.toUpperCase()];
        if (!value) {
            return undefined;
        }
        return parser?.(value) ?? value;
    }

    /**
     * Get a raw value from the environment. Throws an error if a value does not exist.
     *
     * @param key The key to get from the environment.
     */
    public get(key: string): string;

    /**
     * Get a parsed value from the environment. Throws an error if a value does not exist.
     *
     * @param key The key to get from the environment.
     * @param parser The function with which to parse the value.
     */
    public get<T>(key: string, parser: (value: string) => T): T;
    public get<T>(key: string, parser?: (value: string) => T): T | string {
        const value = this.underlying[key.toUpperCase()];
        if (!value) {
            throw new Error(
                `Failed to get ${key.toUpperCase()} from environment.`
            );
        }
        return parser?.(value) ?? value;
    }

    public isDev() {
        return this.getOpt('NODE_ENV') === 'DEVELOPMENT';
    }
}
