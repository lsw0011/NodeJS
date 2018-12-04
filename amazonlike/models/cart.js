
const getDb = require('../util/database').getDb
class Cart {
  constructor(price, products){
    this.price = price;
    this.products = products;
  }
  addProduct(product) {
    if (this.products.length != 0){
      let flag = true;
        this.products.forEach(prod => {
          const existingProd = prod[0];
          if(product == existingProd){
            prod[1] += 1;
            flag = false;
          }
      })
      if (flag) {
        this.products.push([product, 1])
      }
    } else {
      this.products.push([product, 1])
    }
  }

  update(callback){
    let db = getDb()
    db.collection('carts')
      .updateOne({}, {$set: this})
      .then(callback())
  }

  deleteItem(prodId, callback){
    this.products.forEach((prod, index) => {
      if(prod == prodId){
        this.products.splice(index, 1);
      }
    })
  }

  static get(callback){
    const db = getDb();
    db.collection('carts')
      .findOne({})
      .then((cart) => callback(cart))
  }
}



module.exports = Cart;