import { Router, Request, Response } from 'express'
import { CategoryStore, CategoryUpdate } from './category'
import categoryRepository from './category.repository'
import validateSchema from '../../middleware/validateSchema'
import { createCategorySchema, updateCategorySchema } from './category.schema'

export const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await categoryRepository.getAll()
    res.json(result)
  } catch (error:any) {
    console.error('Error on category.controller.ts', error.message)
    res.status(500).json({
      error: 'Não foi possível coletar dados de categorias'
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await categoryRepository.getById(req.params.id)
    res.json(result)
  } catch (error: any) {
    console.error('Error on category.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível coletar dados da categoria ${req.params.id}`
    })
  }
})

router.post('/', validateSchema(createCategorySchema), async (_req: Request, res: Response) => {
  try {
    const result = await categoryRepository.store(res.locals.validated as CategoryStore)
    console.log('Categoria cadastrada', result)
    res.json({
      msg: "Categoria cadastrada"
    })
  } catch (error:any) {
    console.error('Error on category.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível cadastrar categoria`
    })
  }
})

router.put('/:id', validateSchema(updateCategorySchema), async (req: Request, res: Response) => {
  try {
    const result = await categoryRepository.update(req.params.id, req.body as CategoryUpdate)
    console.log(`Categoria ${req.params.id} atualizada`, result)

    res.json({
      msg: 'Categoria atualizada'
    }) 
  } catch (error:any) {
    console.error('Error on category.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível atualizar categoria ${req.params.id}`
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await categoryRepository.destroy(req.params.id)
    console.log(`Categoria ${req.params.id} removida`, result)

    res.json({
      msg: 'Categoria removida!'
    })
  } catch (error: any) {
    console.error('Error on category.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível remover categoria ${req.params.id}`
    })
  }
})

export default router