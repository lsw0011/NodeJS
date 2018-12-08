const Product = require('../models/product');
const User = require('../models/user')
const Order = require('../models/order')


exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  });
};

exports.getProduct = (req, res, next) => {
  Product.
   findById(req.params.productId)
    .exec( ( err, product ) => {
      if( err ) return next( err );
        res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
   });
  });
}

exports.getIndex = (req, res, next) => {
  Product.getAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: user.cart.items
      }
    )
  })
}


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    req.user.addToCart(product)
      .then(res.redirect('/cart'))
    })
  
};

exports.postCartDeleteProduct = (req, res, next) => {
  
  const prodId = req.body.productId;
  req.user.delete(prodId)
  .then(() => {
    res.redirect('/cart')
  })
};

exports.postOrder = (req, res, next) => {
  req.user.addToOrder()
  .then(() => {
    res.redirect('/cart')
  })
};

exports.getOrders = (req, res, next) => {
  Order.find({userId: req.user._id})
  .populate('items.productId')
  .exec( ( err, orders ) => {
    if( err ) return next( err );
      res.render('shop/orders', {
        orders: orders,
        pageTitle: 'Orders',
        path: '/products'
    });

  });
}
