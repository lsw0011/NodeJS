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
  Product.
   findById(prodId)
    .populate('userId')
    .exec( ( err, product ) => {
     if( err ) return next( err );
     res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      productId: prodId
    });
   });
  };
  
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findOneAndUpdate({_id: prodId}, {title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc})
   .exec((err) => {
    if( err ) return next( err );
    res.redirect('/admin/products')
  });
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .populate('userId')
    .then(products => {
      console.log(products)
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

  Product.delete(prodId,() => {
      res.redirect('/admin/products');
    })
  };
