const getDb = require('../util/database').getDb
const ObjectID = require('mongodb').ObjectID

class User {
    constructor(_id, username, email, cart) {
        this._id = _id
        this.name = username;
        this.email = email;
        this.cart = cart;
    }

    save(callback) {
        let db = getDb();
        db.collection('users').updateOne({_id: this._id}, {$set: this}, {upsert: true})
            .then((user) => {
                callback();
            })
    }
    addToCart(product, callback) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return product._id === cp._id
        // });
        const updatedCart = {items: [{product: product._id, quantity: 1}]};
        
        const db = getDb();
        let existingItem = false;
        return db.collection('users').findOne(
            { _id: new ObjectID(this._id) })
            .then(user => {
                
                user.cart.items.forEach(item => {
                    if(item.product.equals(product._id)){
                        item.quantity += 1;
                        existingItem = true;
                    }
                })
                if(existingItem){
                    return user;
                }else{
                    user.cart.items.push({product: product._id, quantity: 1});
                    return user;
                }
          
            }).then(user => {
                return db.collection('users')
                    .updateOne({_id: new ObjectID(this._id)}, {$set: {cart: user.cart}})
            })

    }

    getCartProducts(callback){
        let db = getDb()
        let ids = this.cart.items.map(item => {
            return new ObjectID(item.product);
        })
        db.collection('products').find({_id: {$in: ids}})
            .toArray((err, docs) => {
                docs.forEach((doc, index) => {
                    this.cart.items.forEach(item => {
                        if(doc._id.toString() == item.product.toString()){
                            doc.quantity = item.quantity;
                        }
                    })
                })
                callback(docs)
            })
        
        // db.collection('products').find({$in: {}})
        // db.collection('users').aggregate([
        //         {$match: {name: 'lukewesterfield'}},
        //         {$unwind: "$cart.items"},
        //         { $lookup: {from: "products", localField: 'cart.items.product', foreignField: '_id', as: 'productInfo' } },
        //         {$project: {_id: '$_id', name: '$name', email: '$email', cart: {items: [
        //             {product: "$productInfo", quantity: "$cart.items.quantity"}
        //         ]}}},
        //         {$group: {_id: {_id: '$_id', name: '$name', email: '$email'}, items: {$push: '$cart.items'}}},
        //         {$project: {_id: '$_id._id', name: '$_id.name', email: '$_id.email', cart: {items: '$items'} }}
        //   ] ).toArray((err, array) =>{
        //     const holder = array[0];
        //     const user = new User(holder._id, holder.name, holder.email, holder.cart);
        //     const flattenedCart = []
        //     user.cart.items.forEach((item) => {
        //         item = item[0]
        //         item.product = item.product[0]
        //         flattenedCart.push(item)
        //     })
        //         user.cart.items = flattenedCart
        //         callback(user)
        //   })
        }
    
    deleteFromCart(prodId, callback){
        this.cart.items.forEach((item,index) => {
            if(item.product.equals(new ObjectID(prodId))){
                this.cart.items.splice(index, 1);
                this.save(callback)
            }
           
        }
    )
        
    }

    static find(username) {
        let db = getDb();

        return db.collection('users').findOne({name: username})
    
    }

}
module.exports = User