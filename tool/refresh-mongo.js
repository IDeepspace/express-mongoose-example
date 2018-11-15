import rawData from './fixture/raw-data'
import Item from '../models/itemModle'
import Category from '../models/categoryModel'
import Cart from '../models/cartModel'

const modelMap = {
  Item,
  Cart,
  Category
}

let docs = Object.keys(rawData)

module.exports = function refresh(done) {
  Object.keys(rawData).forEach((v) => {
    modelMap[v].deleteMany(() => {
      modelMap[v].create(rawData[v], () => {
        docs = docs.filter(doc => doc !== v)
        if (docs.length === 0) {
          done()
        }
      })
    })
  })
}
