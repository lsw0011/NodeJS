db.users.aggregate([
    {$match: {name: 'lukewesterfield'}},
    {$unwind: "$cart.items"},
    { $lookup: {from: "products", localField: 'cart.items.product', foreignField: '_id', as: 'productInfo' } },
    {$project: {_id: '$_id', name: '$name', email: '$email', cart: {items: [
        {product: "$productInfo", quantity: "$cart.items.quantity"}
    ]}}},
    {$group: {_id: {_id: '$_id', name: '$name', email: '$email'}, items: {$push: '$cart.items'}}},
    {$project: {_id: '$_id._id', name: '$_id.name', email: '$_id.email', cart: {items: '$items'} }}
]).pretty()
