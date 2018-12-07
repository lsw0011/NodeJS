const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
})

module.exports = mongoose.model('Product', productSchema); 


// const getDb = require('../util/database').getDb;
// var ObjectID = require('mongodb').ObjectID;

// class Product {
//   constructor(_id, name, price, description, imageUrl, userid){
//     this._id = _id;
//     this.name = name;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.userid = userid;
//   }

//   save() {
//     const db = getDb();
//     db.collection('products').insertOne(this)
//       .then((prod) => {return prod})
//       .catch(err => console.log(err));
//     }

//   addToOrder() {
//     let db = getDb();
      

//   }

//   static delete(prodId, callback) {
//     const db = getDb();
//     db.collection('products').deleteOne({_id: new ObjectID(prodId)})
//       .then(() => {
//         callback()
//       })
//   }

//   update(prodId, newValues, callback) {
//     const db = getDb();
//     db.collection('products').updateOne({_id: new ObjectID(prodId)}, { $addToSet: {cart: newValues} } )
//       .then(() => {
//         callback();
//       })

//   }
//   static getAll(callback) {
//     const db = getDb();
//     db.collection('products').find({})
//       .toArray((err, docs) => {
//         callback(docs)
//       })
//   }
//   static getMany(items, callback) {
//     let db = getDb();
//     let objectids = [];
    

    
//     db.collection('products').find({ _id: { $in: objectids }  } )
//       .toArray((err, prods) => {
//         callback(prods)
//       })
//   }
//   static findById(prodId, callback) {
//     const db = getDb();
//     db.collection('products').findOne({ _id: new ObjectID(prodId) })
//       .then(product => {
//         const newProduct = new Product(product._id, 
//           product.name, 
//           product.price, 
//           product.description, 
//           product.imageUrl,
//           product.userId )
//           callback(newProduct)
//     })
//   }
// }

// module.exports = Product;
