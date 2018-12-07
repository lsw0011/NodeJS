const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  
  const product = new Product({
    title: title, 
    imageUrl: imageUrl, 
    price: price, 
    description: description, 
    userId: req.user._id
  });
  product
    .save()
    .then(result => {
      console.log('Created Product')
      res.redirect('/admin/products')
    })

  // req.user.createProduct({
  //   title: title,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: description,
  //   userId: req.user.id
  // }).then((result) => {
  //   res.redirect('/')
  // }).catch((err) => console.log(err));

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(product)
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        productId: prodId
      });
    });
  }
exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(productId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save()
    }).then(product => {
      res.redirect('/products')
    })
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  });
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId)

  Product.findByIdAndRemove(prodId,() => {
      res.redirect('/admin/products');
    })
  };
