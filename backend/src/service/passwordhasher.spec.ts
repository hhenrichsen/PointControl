import { MockEnvironment } from './environment.mock';
import { PasswordHasher } from './passwordhasher';

describe(module.id, () => {
    it('should hash and validate passwords', async () => {
        const hasher = new PasswordHasher(
            new MockEnvironment({ HASH_SECRET: 'testtest' })
        );
        const hashed = await hasher.hash('test');
        expect(await hasher.compare('test', hashed)).toBeTruthy();
    });

    it('should validate hash passwords', async () => {
        const hasher = new PasswordHasher(
            new MockEnvironment({ HASH_SECRET: 'testtest' })
        );
        const hashed = await hasher.hash('test');
        expect(await hasher.compare('not_test', hashed)).toBeFalsy();
    });

    it('should generate different hashes with different secrets', async () => {
        const hasher = new PasswordHasher(
            new MockEnvironment({ HASH_SECRET: 'testtest' })
        );
        const hasher2 = new PasswordHasher(
            new MockEnvironment({ HASH_SECRET: 'test_test_test' })
        );
        const hashed = await hasher.hash('test');
        const hashed2 = await hasher2.hash('test');
        expect(hashed).not.toEqual(hashed2);
    });
});
