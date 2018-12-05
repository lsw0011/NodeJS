const getDb = require('../util/database').getDb;
var ObjectID = require('mongodb').ObjectID;
class Order {
  constructor(user, products){
    this.user = user;
    this.products = [];

  }
  
  addProduct(products){
    
    
  }

} 

module.exports = Order;