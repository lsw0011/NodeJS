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
        db.collection('users').insertOne(this)
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

    static find(username) {
        let db = getDb();

        return db.collection('users').findOne({name: username})
    
    }

}
module.exports = User