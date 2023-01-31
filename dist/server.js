"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const ormconfig_1 = __importDefault(require("./config/ormconfig"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
ormconfig_1.default
    .initialize()
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.use(error_middleware_1.errorMiddleware);
app.listen(9090, () => console.log(9090));
