const Product = require('../models/product');


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
  Product.find({_id: req.params.productId}, (err, result) => {
    console.log(result)
    if(result != undefined){
      const product = result[0]
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })    
    }
    next()
  })
};

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
  console.log(req.user.cart)
  req.user.getCartProducts((items) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: items
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
      req.user.addToCart(product)
        .then(res.redirect('/cart'))
    })
  
};

exports.postCartDeleteProduct = (req, res, next) => {
  
  const prodId = req.body.productId;
  req.user.deleteFromCart(prodId,() => {
    res.redirect('/cart')
  })
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder(() => {
    res.redirect('/cart')
  })
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders((orders) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    })  })
  
};

