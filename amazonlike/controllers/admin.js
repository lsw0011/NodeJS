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
  
  const prod = new Product(null, title, imageUrl, price, description, req.user._id)
  prod.save()
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
  console.log('fuck')
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.get(prodId, product => {
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
  const prodId = req.body.productId;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const newValues = {name: updatedName, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc};
  console.log(prodId)
  Product.get(prodId, (product) => {
    product.update(prodId, newValues, () => {
      res.redirect('/products');
    })
  });
}

exports.getProducts = (req, res, next) => {
  Product.getAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  console.log(req.body.productId)
  console.log('fuck')
  Product.delete(prodId,() => {
      res.redirect('/admin/products');
    })
  };
