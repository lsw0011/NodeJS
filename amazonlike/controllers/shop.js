const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.getAll((products) => {
      res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.get(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.name,
      path: '/products'
    });
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
  const ids = [];
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

// exports.postOrder = (req, res, next) => {
//   req.user.getCart()
//     .then(cart => {
//       return cart.getProducts();
//     }).then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           order.addProducts(products.map(product => {
//             product.orderItem = { quantity: product.cartitem.quantity };
//             return product;
//            }))
//         })
//         .catch(err => console.log(err))

//      }).then(() => {
//        req.cart.destroy('products')
//      }).then((result) => {
//         res.redirect('/orders');
//     }).catch(err => console.log(err))
// };

// exports.getOrders = (req, res, next) => {
//   req.user.getOrders({ include: ['products'] })
//     .then(orders => {
//       console.log(orders[1])
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
  
// };

