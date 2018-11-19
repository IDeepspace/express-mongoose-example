import statusCode from '../HttpStatus/statusCode'
import Item from '../models/itemModle'
import async from 'async'

class ItemController {
    getAll(req, res, next) {
        async.series({
            items: (done) => {
                Item.find({})
                    .populate('category')
                    .exec(done)
            },
            totalCount: (done) => {
                Item.countDocuments(done)
            }
        }, (err, result) => {
            if (err) {
                return next(err)
            }
            return res.status(statusCode.httpStatusCode.OK).send(result)
        })
    }

    getOne(req, res, next) {
        const itemId = req.params.itemId
        Item.findById(itemId)
            .populate('category')
            .exec((err, doc) => {
                if (err) {
                    return next(err)
                }
                if (!doc) {
                    return res.sendStatus(statusCode.httpStatusCode.NOT_FOUND)
                }
                return res.status(statusCode.httpStatusCode.OK).send(doc)
            })
    }

    delete(req, res, next) {
        const itemId = req.params.itemId
        Item.findByIdAndRemove(itemId, (err, doc) => {
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
        Item.create(req.body, (err, doc) => {
            if (err) {
                return next(err)
            }
            return res.status(statusCode.httpStatusCode.CREATED).send({ uri: `items/${doc._id}` })
        })
    }

    update(req, res, next) {
        Item.findByIdAndUpdate(req.params.itemId, req.body, (err, doc) => {
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

module.exports = ItemController
