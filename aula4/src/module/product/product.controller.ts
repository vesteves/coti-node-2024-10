import { Router, Request, Response } from 'express'
import { ProductStore, ProductUpdate } from './product'
import productRepository from './product.repository'
import validateSchema from '../../middleware/validateSchema'
import { createProductSchema, updateProductSchema } from './product.schema'

export const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await productRepository.getAll()
    res.json(result)
  } catch (error:any) {
    console.error('Error on product.controller.ts', error.message)
    res.status(500).json({
      error: 'Não foi possível coletar dados de produtos'
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await productRepository.getById(req.params.id)
    res.json(result)
  } catch (error: any) {
    console.error('Error on product.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível coletar dados do produto ${req.params.id}`
    })
  }
})

router.post('/', validateSchema(createProductSchema), async (_req: Request, res: Response) => {
  console.log(res.locals.validated)
  try {
    const result = await productRepository.store(res.locals.validated as ProductStore)
    console.log('Produto cadastrado', result)
    res.json({
      msg: "Produto cadastrado"
    })
  } catch (error:any) {
    console.error('Error on product.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível cadastrar produto`
    })
  }
})

router.put('/:id', validateSchema(updateProductSchema), async (req: Request, res: Response) => {
  try {
    const result = await productRepository.update(req.params.id, req.body as ProductUpdate)
    console.log(`Produto ${req.params.id} atualizado`, result)

    res.json({
      msg: 'Produto atualizado'
    }) 
  } catch (error:any) {
    console.error('Error on product.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível atualizar produto ${req.params.id}`
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await productRepository.destroy(req.params.id)
    console.log(`Produto ${req.params.id} removido`, result)

    res.json({
      msg: 'Produto removido!'
    })
  } catch (error: any) {
    console.error('Error on product.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível remover produto ${req.params.id}`
    })
  }
})

export default router