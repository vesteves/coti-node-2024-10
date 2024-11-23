"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaMiddleware = void 0;
const validateSchemaMiddleware = (schema) => (req, res, next) => {
    try {
        const validated = schema.parse(req.body);
        res.locals.validated = validated;
        next();
    }
    catch (error) {
        res.status(422).json({
            msg: 'Erro no corpo da requisição',
            errors: error.errors
        });
        return;
    }
};
exports.validateSchemaMiddleware = validateSchemaMiddleware;
exports.default = exports.validateSchemaMiddleware;
