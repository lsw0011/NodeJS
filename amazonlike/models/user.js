const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: 
        [
            { 
                productId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }
})

module.exports = mongoose.model('User', userSchema)
// const getDb = require('../util/database').getDb
// const ObjectID = require('mongodb').ObjectID

// class User {
//     constructor(_id, username, email, cart) {
//         this._id = _id
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//     }

//     save(callback) {
//         let db = getDb();
//         db.collection('users').updateOne({_id: this._id}, {$set: this}, {upsert: true})
//             .then((user) => {
//                 callback();
//             })
//     }
//     addToCart(product, callback) {

//         const db = getDb();
//         let existingItem = false;
//         this.cart.items.forEach(item => {
//             if(item.product.equals(product._id)){
//                 item.quantity += 1;
//                 existingItem = true;
//             }
//         })
//         if(!existingItem){
//             this.cart.items.push({product: product._id, quantity: 1});
//         }
//         return db.collection('users')
//             .updateOne({_id: new ObjectID(this._id)}, {$set: {cart: this.cart}})
//     }

//     getCartProducts(callback){
//         let db = getDb()
//         console.log(this.cart)
//         let ids = this.cart.items.map(item => {
//             return new ObjectID(item.product);
//         })
//         db.collection('products')
//             .find({_id: {$in: ids}})
//             .toArray((err, docs) => {
//                 docs.forEach((doc, index) => {
//                     this.cart.items.forEach(item => {
//                         if(doc._id.toString() == item.product.toString()){
//                             doc.quantity = item.quantity;
//                         }
//                     })
//                 })
//                 callback(docs)
//             })


//     }

    
//     deleteFromCart(prodId, callback){
//         this.cart.items.forEach((item,index) => {
//             if(item.product.equals(new ObjectID(prodId))){
//                 this.cart.items.splice(index, 1);
//                 this.save(callback)
//             }
           
//         }
//     )
        
// }

//     addOrder(callback) {
//         let db = getDb()
        
//         this.getCartProducts(items => {
//             db.collection('orders').insertOne({items: items, userId: this._id})
//                 .then(() => {
//                     this.cart.items = [];
//                     this.save(callback);
//                 })
//         });
//     }

//     getOrders(callback) {
//         let db = getDb()
//         db.collection('orders')
//             .find({userId: this._id})
//             .toArray((err, docs) => {
//                 callback(docs)
//             })
//     }

//     static find(username) {
//         let db = getDb();

//         return db.collection('users').findOne({name: username})
    
//     }

// }
// module.exports = User