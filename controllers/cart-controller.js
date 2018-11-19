import Cart from '../models/cartModel'
import statusCode from '../HttpStatus/statusCode'
import async from 'async'

const mapItemToUri = (items) => {
    return items.map(({ count, item }) => {
        return { uri: `items/${item}`, count }
    })
}

class CartController {
    getAll(req, res, next) {
        async.series({
            items: (done) => {
                Cart.find({}, (err, docs) => {
                    if (err) {
                        return done(err)
                    }

                    let carts = docs.map((doc) => {
                        let cart = doc.toJSON()
                        cart.items = mapItemToUri(cart.items)
                        return cart
                    })
                    done(null, carts)
                })
            },
            totalCount: (done) => {
                Cart.countDocuments(done)
            }
        }, (err, result) => {
            if (err) {
                return next(err)
            }
            return res.status(statusCode.httpStatusCode.OK).send(result)
        })
    }

    getOne(req, res, next) {
        const cartId = req.params.cartId
        Cart.findById(cartId, (err, doc) => {
            if (err) {
                return next(err)
            }
            if (!doc) {
                return res.sendStatus(statusCode.httpStatusCode.NOT_FOUND)
            }
            let data = doc.toJSON()
            let items = doc.items
            data.items = mapItemToUri(items)

            return res.status(statusCode.httpStatusCode.OK).send(data)
        })
    }

    delete(req, res, next) {
        const cartId = req.params.cartId
        Cart.findOneAndDelete(cartId, (err, doc) => {
            if (err) {
                return next(err)
            }
            if (!doc) {
                return res.sendStatus(statusCode.httpStatusCode.NOT_FOUND)
            }
            return res.sendStatus(statusCode.httpStatusCode.NO_CONTENT)
        })
    }

    create(req, res, next) {
        Cart.create(req.body, (err, doc) => {
            if (err) {
                return next(err)
            }
            return res.status(statusCode.httpStatusCode.CREATED).send({ uri: `carts/${doc._id}` })
        })
    }

    update(req, res, next) {
        const cartId = req.params.cartId
        Cart.findOneAndUpdate(cartId, req.body, (err, doc) => {
            if (err) {
                return next(err)
            }
            if (!doc) {
                return res.sendStatus(statusCode.httpStatusCode.NOT_FOUND)
            }
            return res.sendStatus(statusCode.httpStatusCode.NO_CONTENT)
        })
    }

}

module.exports = CartController
