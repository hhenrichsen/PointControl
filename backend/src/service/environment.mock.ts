import { Environment } from './environment';
import { Service } from 'typedi';

@Service({ id: Environment })
export class MockEnvironment extends Environment {
    constructor(
        protected readonly underlying: { [key: string]: string | undefined }
    ) {
        super();
    }
}
