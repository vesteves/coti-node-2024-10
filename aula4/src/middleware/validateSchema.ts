import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

export const validateSchemaMiddleware = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = schema.parse(req.body)

    res.locals.validated = validated

    next()
  } catch (error: any) {
    res.status(422).json({
      msg: 'Erro no corpo da requisição',
      errors: error.errors
    })
    return
  }
}

export default validateSchemaMiddleware