import Category from '../models/categoryModel'
import statusCode from '../HttpStatus/statusCode'
import Item from '../models/itemModle'
import async from 'async'

class CategoryController {
    getAll(req, res, next) {
        async.series({
            items: (done) => {
                Category.find({}, done)
            },
            totalCount: (done) => {
                Category.countDocuments(done)
            }
        }, (err, result) => {
            if (err) {
                return next(err)
            }
            return res.status(statusCode.httpStatusCode.OK).send(result)
        })
    }

    getOne(req, res, next) {
        const categoryId = req.params.categoryId
        Category.findById(categoryId, (err, doc) => {
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
        const category = req.params.categoryId

        async.waterfall([
            (done) => {
                Item.findOne({ category }, done)
            },
            (docs, done) => {
                if (docs) {
                    done(true, null)
                } else {
                    Category.findByIdAndRemove(category, (err, doc) => {
                        if (!doc) {
                            return done(false, null)
                        }
                        done(err, doc)
                    })
                }
            }
        ], (err) => {
            if (err === true) {
                return res.sendStatus(statusCode.httpStatusCode.BAD_REQUEST)
            }
            if (err === false) {
                return res.sendStatus(statusCode.httpStatusCode.NOT_FOUND)
            }
            if (err) {
                return next(err)
            }
            return res.sendStatus(statusCode.httpStatusCode.NO_CONTENT)
        })
    }

    create(req, res, next) {
        Category.create(req.body, (err, doc) => {
            if (err) {
                return next(err)
            }
            return res.status(statusCode.httpStatusCode.CREATED).send({ uri: `categories/${doc._id}` })
        })
    }

    update(req, res, next) {
        const categoryId = req.params.categoryId
        Category.findByIdAndUpdate(categoryId, req.body, (err, doc) => {
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

module.exports = CategoryController
