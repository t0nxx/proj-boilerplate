"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
switch (process.env.NODE_ENV) {
    case 'test':
        exports.currentEnvironment = path.join(__dirname, '..', '..', '.env.test');
        break;
    case 'production':
        exports.currentEnvironment = path.join(__dirname, '..', '..', '.env.production');
        break;
    default:
        exports.currentEnvironment = path.join(__dirname, '..', '..', '.env.development');
}
;
//# sourceMappingURL=current.environmernt.js.map