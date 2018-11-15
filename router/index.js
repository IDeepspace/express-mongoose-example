import items from './routers/items'
import categories from './routers/categories'
import carts from './routers/carts'

module.exports = function (app) {
    app.use('/items', items)
    app.use('/categories', categories)
    app.use('/carts', carts)
}
