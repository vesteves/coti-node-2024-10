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
exports.router = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const user_repository_1 = __importDefault(require("../user/user.repository"));
const authenticate_1 = __importDefault(require("../../middleware/authenticate"));
const auth_schema_1 = require("./auth.schema");
const validateSchema_1 = __importDefault(require("../../middleware/validateSchema"));
exports.router = (0, express_1.Router)();
exports.router.post('/register', (0, validateSchema_1.default)(auth_schema_1.registerSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
    const result = yield user_repository_1.default.store(req.body);
    const token = jsonwebtoken_1.default.sign({
        id: result._id
    }, process.env.JWT_SECRET || '');
    res.json({
        msg: 'Usuário cadastrado',
        token
    });
}));
exports.router.get('/me', authenticate_1.default, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Usuário identificado',
        user: res.locals.user
    });
}));
exports.router.post('/login', (0, validateSchema_1.default)(auth_schema_1.loginSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO receber os dados do corpo da requisição
    const body = req.body;
    // TODO verificar se existe um usuário na minha base de dados contendo o e-mail que veio pelo body requisition
    const result = yield user_repository_1.default.getByEmail(body.email);
    // TODO validar o banco de dados retornou um usuário
    if (!result) {
        res.status(404).json({
            msg: 'Usuário não encontrado'
        });
        return;
    }
    // TODO verificar se a senha que veio via body requisition é a mesma senha cadastrada no banco
    const isValidPassword = bcrypt_1.default.compareSync(body.password, result.password);
    if (!isValidPassword) {
        res.status(403).json({
            msg: 'Dados da autenticação não conferem'
        });
        return;
    }
    // TODO crio um token para o usuário e entrego como resposta da requisição
    const token = jsonwebtoken_1.default.sign({
        id: result._id
    }, process.env.JWT_SECRET || '');
    res.json({
        token: `Bearer ${token}`
    });
}));
exports.default = exports.router;
