"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonBody = exports.jsonUrl = void 0;
class jsonUrl {
    constructor(url) {
        this.url = url;
    }
}
exports.jsonUrl = jsonUrl;
class jsonBody {
    constructor(body, id) {
        this.body = body;
        this.id = id;
    }
}
exports.jsonBody = jsonBody;
