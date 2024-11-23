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
const express_1 = require("express");
const user_repository_1 = __importDefault(require("./user.repository"));
const validateSchema_1 = __importDefault(require("../../middleware/validateSchema"));
const user_schema_1 = require("./user.schema");
exports.router = (0, express_1.Router)();
exports.router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_repository_1.default.getAll();
    res.json(result);
}));
exports.router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_repository_1.default.getById(req.params.id);
    res.json(result);
}));
exports.router.post('/', (0, validateSchema_1.default)(user_schema_1.createUserSchema), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.locals.validated.password = bcrypt_1.default.hashSync(res.locals.validated.password, 10);
    const result = yield user_repository_1.default.store(res.locals.validated);
    res.json({
        msg: "Usuario cadastrado"
    });
}));
exports.router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
    }
    const result = yield user_repository_1.default.update(req.params.id, req.body);
    res.json({
        msg: 'Usuario atualizado'
    });
    return;
}));
exports.router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_repository_1.default.destroy(req.params.id);
    res.json({
        msg: 'Usuario removido!'
    });
}));
exports.default = exports.router;
