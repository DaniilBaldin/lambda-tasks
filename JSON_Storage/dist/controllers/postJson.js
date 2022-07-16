"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postJson = void 0;
const database_1 = require("../middlewares/database");
const postJson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const url = req.params.route;
        const reqBody = req.body;
        const oldUrl = yield ((_a = database_1.collections.jsonCollection) === null || _a === void 0 ? void 0 : _a.findOne({ url }));
        if (oldUrl) {
            res.status(500).send('Url already exists! Please enter new url.');
        }
        const result = yield ((_b = database_1.collections.jsonCollection) === null || _b === void 0 ? void 0 : _b.insertOne({ url, reqBody }));
        result ? res.status(201).send('Succesfully created new item in database!') : res.status(500).send('Failed to create a new item!');
    }
    catch (err) {
        return err;
    }
});
exports.postJson = postJson;
