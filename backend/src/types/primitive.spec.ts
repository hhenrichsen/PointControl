import {
    isBigInt,
    isBoolean,
    isFalse,
    isFalsy,
    isNumber,
    isString,
    isTrue,
    isTruthy,
    isUniform1stOrderTuple,
    isUniform2ndOrderTuple,
    isUniform3rdOrderTuple,
} from './primitive';

describe(module.id, () => {
    it('should return true from isString for string values', () => {
        expect(isString('')).toBe(true);
        expect(isString('a')).toBe(true);
        expect(isString('abc')).toBe(true);
    });

    it('should return false from isString for non-string values', () => {
        expect(isString(undefined)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(0)).toBe(false);
        expect(isString(1)).toBe(false);
        expect(isString(1.1)).toBe(false);
        expect(isString(1n)).toBe(false);
        expect(isString(false)).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString([])).toBe(false);
        expect(
            isString(() => {
                return;
            })
        ).toBe(false);
    });

    it('should return true from isNumber for number values', () => {
        expect(isNumber(0)).toBe(true);
        expect(isNumber(1)).toBe(true);
        expect(isNumber(1.1)).toBe(true);
    });

    it('should return false from isNumber for non-number values', () => {
        expect(isNumber(undefined)).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber('')).toBe(false);
        expect(isNumber('a')).toBe(false);
        expect(isNumber('abc')).toBe(false);
        expect(isNumber(1n)).toBe(false);
        expect(isNumber(false)).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber([])).toBe(false);
        expect(
            isNumber(() => {
                return;
            })
        ).toBe(false);
    });

    it('should return true from isBigInt for bigint values', () => {
        expect(isBigInt(1n)).toBe(true);
    });

    it('should return false from isBigInt for non-bigint values', () => {
        expect(isBigInt(undefined)).toBe(false);
        expect(isBigInt(null)).toBe(false);
        expect(isBigInt('')).toBe(false);
        expect(isBigInt('a')).toBe(false);
        expect(isBigInt('abc')).toBe(false);
        expect(isBigInt(0)).toBe(false);
        expect(isBigInt(1)).toBe(false);
        expect(isBigInt(1.1)).toBe(false);
        expect(isBigInt(false)).toBe(false);
        expect(isBigInt(true)).toBe(false);
        expect(isBigInt({})).toBe(false);
        expect(isBigInt([])).toBe(false);
        expect(
            isBigInt(() => {
                return;
            })
        ).toBe(false);
    });

    it('should return true from isBoolean for boolean values', () => {
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(true)).toBe(true);
    });

    it('should return false from isBoolean for non-boolean values', () => {
        expect(isBoolean(undefined)).toBe(false);
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean('')).toBe(false);
        expect(isBoolean('a')).toBe(false);
        expect(isBoolean('abc')).toBe(false);
        expect(isBoolean(0)).toBe(false);
        expect(isBoolean(1)).toBe(false);
        expect(isBoolean(1.1)).toBe(false);
        expect(isBoolean(1n)).toBe(false);
        expect(isBoolean({})).toBe(false);
        expect(isBoolean([])).toBe(false);
        expect(
            isBigInt(() => {
                return;
            })
        ).toBe(false);
    });

    it('should return true from isTrue for true values', () => {
        expect(isTrue(true)).toBe(true);
    });

    it('should return false from isTrue for non-true values', () => {
        expect(isTrue(undefined)).toBe(false);
        expect(isTrue(null)).toBe(false);
        expect(isTrue('')).toBe(false);
        expect(isTrue('a')).toBe(false);
        expect(isTrue('abc')).toBe(false);
        expect(isTrue(0)).toBe(false);
        expect(isTrue(1)).toBe(false);
        expect(isTrue(1.1)).toBe(false);
        expect(isTrue(1n)).toBe(false);
        expect(isTrue(false)).toBe(false);
        expect(isTrue({})).toBe(false);
        expect(isTrue([])).toBe(false);
        expect(
            isBigInt(() => {
                return;
            })
        ).toBe(false);
    });

    it('should return true from isFalse for false', () => {
        expect(isFalse(false)).toBe(true);
    });

    it('should return false from isFalse for non-false values', () => {
        expect(isFalse(undefined)).toBe(false);
        expect(isFalse(null)).toBe(false);
        expect(isFalse('')).toBe(false);
        expect(isFalse('a')).toBe(false);
        expect(isFalse('abc')).toBe(false);
        expect(isFalse(0)).toBe(false);
        expect(isFalse(1)).toBe(false);
        expect(isFalse(1.1)).toBe(false);
        expect(isFalse(1n)).toBe(false);
        expect(isFalse(true)).toBe(false);
        expect(isFalse({})).toBe(false);
        expect(isFalse([])).toBe(false);
        expect(
            isBigInt(() => {
                return;
            })
        ).toBe(false);
    });

    it('should return true from isTruthy for truthy values', () => {
        expect(isTruthy('a')).toBe(true);
        expect(isTruthy(1)).toBe(true);
        expect(isTruthy(1.1)).toBe(true);
        expect(isTruthy(1n)).toBe(true);
        expect(isTruthy(true)).toBe(true);
        expect(isTruthy({})).toBe(true);
        expect(isTruthy([])).toBe(true);
    });

    it('should return false from isTruthy for falsy values', () => {
        expect(isTruthy(undefined)).toBe(false);
        expect(isTruthy(null)).toBe(false);
        expect(isTruthy('')).toBe(false);
        expect(isTruthy(false)).toBe(false);
        expect(isTruthy(NaN)).toBe(false);
        expect(isTruthy(0)).toBe(false);
        expect(isTruthy(-0)).toBe(false);
        expect(isTruthy(0n)).toBe(false);
    });

    it('should return true from isFalsy for falsy values', () => {
        expect(isFalsy(undefined)).toBe(true);
        expect(isFalsy(null)).toBe(true);
        expect(isFalsy('')).toBe(true);
        expect(isFalsy(false)).toBe(true);
        expect(isFalsy(NaN)).toBe(true);
        expect(isFalsy(0)).toBe(true);
        expect(isFalsy(-0)).toBe(true);
        expect(isFalsy(0n)).toBe(true);
    });

    it('should return false from isFalsy for truthy values', () => {
        expect(isFalsy('a')).toBe(false);
        expect(isFalsy(1)).toBe(false);
        expect(isFalsy(1.1)).toBe(false);
        expect(isFalsy(1n)).toBe(false);
        expect(isFalsy(true)).toBe(false);
        expect(isFalsy({})).toBe(false);
        expect(isFalsy([])).toBe(false);
    });

    it('should return true from isUniform1stOrderTuple for non-empty arrays', () => {
        expect(isUniform1stOrderTuple([1])).toBe(true);
        expect(isUniform1stOrderTuple([1, 2])).toBe(true);
        expect(isUniform1stOrderTuple([1, 2, 3])).toBe(true);
    });

    it('should return false from isUniform1stOrderTuple for empty arrays', () => {
        expect(isUniform1stOrderTuple([])).toBe(false);
    });

    it('should return true from isUniform2ndOrderTuple for arrays of 2 or more items', () => {
        expect(isUniform2ndOrderTuple([1, 2])).toBe(true);
        expect(isUniform2ndOrderTuple([1, 2, 3])).toBe(true);
    });

    it('should return false from isUniform2ndOrderTuple for arrays of 1 or fewer items', () => {
        expect(isUniform2ndOrderTuple([])).toBe(false);
        expect(isUniform2ndOrderTuple([1])).toBe(false);
    });

    it('should return true from isUniform3rdOrderTuple for arrays of 3 or more items', () => {
        expect(isUniform3rdOrderTuple([1, 2, 3])).toBe(true);
        expect(isUniform3rdOrderTuple([1, 2, 3, 4])).toBe(true);
    });

    it('should return false from isUniform3rdOrderTuple for arrays of 2 or fewer items', () => {
        expect(isUniform3rdOrderTuple([])).toBe(false);
        expect(isUniform3rdOrderTuple([1])).toBe(false);
        expect(isUniform3rdOrderTuple([1, 2])).toBe(false);
    });
});
