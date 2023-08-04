export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isBigInt(value: unknown): value is bigint {
    return typeof value === 'bigint';
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

export function isTrue(value: unknown): value is true {
    return value === true;
}

export function isFalse(value: unknown): value is false {
    return value === false;
}

export function isTruthy<T>(
    value: T | null | undefined | 0 | -0 | typeof NaN | 0n | ''
): value is T {
    return !!value;
}

export function isFalsy<T>(
    value: T | null | undefined | 0 | -0 | typeof NaN | 0n | ''
): value is null | undefined | 0 | -0 | typeof NaN | 0n | '' {
    return !value;
}

export function isUniform1stOrderTuple<T>(value: T[]): value is [T, ...T[]] {
    return value.length >= 1;
}

export function isUniform2ndOrderTuple<T>(value: T[]): value is [T, T, ...T[]] {
    return value.length >= 2;
}

export function isUniform3rdOrderTuple<T>(
    value: T[]
): value is [T, T, T, ...T[]] {
    return value.length >= 3;
}
