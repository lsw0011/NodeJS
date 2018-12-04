const getDb = require('../util/database').getDb;
var ObjectID = require('mongodb').ObjectID;

class Product {
  constructor(title, price, description, imageUrl){     
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    db.collection('products').insertOne(this)
      .then((prod) => {return prod})
      .catch(err => console.log(err));
  }
  static getAll(callback) {
    const db = getDb();
    db.collection('products').find({})
      .toArray((err, docs) => {
        callback(docs)
      })
  }
  static getMany(ids, callback) {
    let db = getDb();
    let objectids = [];

    ids.forEach(id => { objectids.push(new ObjectID(id)) });    
    db.collection('products').find({ _id: { $in: objectids }  } )
      .toArray((err, prods) => {
        callback(prods)
      })
  }
  static get(prodId, callback) {
    const db = getDb();
    db.collection('products').findOne({ _id: new ObjectID(prodId) })
      .then(product => {
        callback(product)
      })
  }
}

module.exports = Product;
