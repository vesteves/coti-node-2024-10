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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./module/user/user.controller"));
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const mongoose_1 = __importDefault(require("mongoose"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// rotas
app.use('/user', authenticate_1.default, user_controller_1.default);
app.use('/auth', auth_controller_1.default);
// http://localhost:8000/auth/register
// http:// = PROTOCOLO
// localhost = DOMINIO
// :8000 = PORTA
// /auth = PREFIXO
// /register = ROTA
app.listen(process.env.PORT || 8000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.DB_CONNECTION_STRING || '');
    console.log('Server ON');
}));
