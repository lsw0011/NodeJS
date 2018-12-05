
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
          const existingProd = prod._id;
          if(product == existingProd){
            prod.quantity += 1;
            flag = false;
          }
      })
      if (flag) {
        this.products.push({_id: product, quantity: 1})
      }
    } else {
      this.products.push({_id: product, quantity: 1})
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
      if(prod._id == prodId){
        this.products.splice(index, 1);
        this.update(callback);
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