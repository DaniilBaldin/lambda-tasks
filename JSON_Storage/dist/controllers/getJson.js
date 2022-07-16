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
exports.getJson = void 0;
const database_1 = require("../middlewares/database");
const getJson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const url = req.params.route;
        const findUrl = yield ((_a = database_1.collections.jsonCollection) === null || _a === void 0 ? void 0 : _a.findOne({ url }));
        if (findUrl) {
            res.status(200).send(findUrl);
        }
        else
            res.status(404).send('Route not found!');
    }
    catch (err) {
        return err;
    }
});
exports.getJson = getJson;
