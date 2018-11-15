import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String },
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
