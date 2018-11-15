import mongoose from 'mongoose'
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
