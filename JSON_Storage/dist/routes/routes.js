"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postJson_1 = require("../controllers/postJson");
const getJson_1 = require("../controllers/getJson");
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.post('/:route', postJson_1.postJson);
router.get('/:route', getJson_1.getJson);
exports.default = router;
