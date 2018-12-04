const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  Product.get()
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  
  const prod = new Product(title, imageUrl, price, description)
  prod.get()
  prod.save()
  prod.get()
  res.redirect('/')

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
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    }).catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.update({title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc},
    {where: {id: prodId}}
    ).then(() => {
      res.redirect('/admin/products');
    }).catch((err) => console.log(err))
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({where: {id: prodId}})
    .then(() => {
      res.redirect('/admin/products');
    }).catch((err) => console.log(err))
};
