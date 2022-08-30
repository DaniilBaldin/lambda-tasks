"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const k6_1 = require("k6");
const http_1 = __importDefault(require("k6/http"));
const url = 'https://ugemtwo2lj.execute-api.us-east-1.amazonaws.com/produce';
exports.options = {
    vus: 10,
    iterations: 1000,
};
exports.default = () => {
    const randomInt = Math.floor(Math.random() * 10);
    const payload = JSON.stringify({
        message: `random token number ${randomInt}.`,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = http_1.default.post(url, payload, params);
    (0, k6_1.check)(response, {
        'status is 200': (r) => r.status === 200,
    });
    (0, k6_1.sleep)(1);
};
