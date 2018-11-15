import { Router } from 'express'
import ItemController from '../../controller/item-controller'

const router = Router()
const itemCtrl = new ItemController()

router.get('/', itemCtrl.getAll)
router.get('/:itemId', itemCtrl.getOne)
router.delete('/:itemId', itemCtrl.delete)
router.post('/', itemCtrl.create)
router.put('/:itemId', itemCtrl.update)

module.exports = router
