"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./middlewares/database");
const routes_1 = __importDefault(require("./routes/routes"));
const port = 3000;
const app = (0, express_1.default)();
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
(0, database_1.connectToDatabase)().then(() => {
    app.use('/', routes_1.default);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
