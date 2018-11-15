import { Router } from 'express'
import CategoryController from '../../controller/category-controller'

const router = Router()
const categoryCtrl = new CategoryController()

router.get('/', categoryCtrl.getAll)
router.get('/:categoryId', categoryCtrl.getOne)
router.delete('/:categoryId', categoryCtrl.delete)
router.post('/', categoryCtrl.create)
router.put('/:categoryId', categoryCtrl.update)

module.exports = router
