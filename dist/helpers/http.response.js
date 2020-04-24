"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function OkHttp(response, body) {
    return body ? response.status(200).send(body) : response.status(200).send();
}
exports.OkHttp = OkHttp;
//# sourceMappingURL=http.response.js.map