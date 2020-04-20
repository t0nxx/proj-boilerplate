import * as path from 'path';
export let currentEnvironment;
switch (process.env.NODE_ENV) {
    case 'test':
        currentEnvironment = path.join(__dirname, '..', '..', '.env.test');
        break;
    case 'production':
        currentEnvironment = path.join(__dirname, '..', '..', '.env.production');
        break;
    default:
        currentEnvironment = path.join(__dirname, '..', '..', '.env.development');
};