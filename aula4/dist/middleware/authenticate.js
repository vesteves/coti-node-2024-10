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
exports.authenticateMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../module/user/user.repository"));
const verifyToken = (token, res) => {
    try {
        const tokenVerified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        if (typeof (tokenVerified) !== 'object') {
            res.json({
                msg: 'Token inválido',
            });
            return;
        }
        return tokenVerified.id;
    }
    catch (error) {
        res.json({
            msg: 'Token inválido',
        });
    }
};
const authenticateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.json({
            msg: 'Token não encontrado na requisição'
        });
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = verifyToken(token, res);
    if (!tokenVerified) {
        return;
    }
    const user = yield user_repository_1.default.getById(tokenVerified);
    if (!user) {
        res.json({
            msg: 'Usuário não tem permissão',
        });
        return;
    }
    res.locals.user = user;
    next();
});
exports.authenticateMiddleware = authenticateMiddleware;
exports.default = exports.authenticateMiddleware;
