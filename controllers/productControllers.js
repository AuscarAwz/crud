const crypto = require('crypto');
const CrudModel = require('../model/model.js');

const products = [
    {
        "_id": "4b01acfb-7c4f-4bf8-9914-4fd141c34aes",
        "name": "laptop",
        "price": 2000,
        "quantity": 4,
        "active": true
    },
    {
        "_id": "4b01acfb-7c4f-4bf8-9914-4fd141c34aea",
        "name": "Keyboard",
        "price": 500,
        "quantity": 2,
        "active": true
    },
    {
        "_id": "4b01acfb-7c4f-4bf8-9914-4fd141c34aee",
        "name": "YogaSlim Lenova",
        "price": 300,
        "quantity": 2,
        "active": true
    }
]

// routers.get('/', (req, res) => {
//     res.send('Hello World')
// } )

exports.getAllProducts = async (req, res) => {
    const crudproducts = await CrudModel.find();
    console.log(crudproducts);
    return res.status(200).json(crudproducts)
} 

//routers.post('/', )
exports.CreateProduct = async (req, res) => {
   

    const { name, email, price, quantity, active } = req.body

    if(!name || !price || !quantity || !active || !email) {
        return res.status(422).json({message: 'All fields are required'})
    }

    const _id = crypto.randomUUID()
    try {

        const existingProduct = await CrudModel.findOne({ name });
        
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this name already exists." });
        }


    const product = new CrudModel({
        productID: _id,
        name,
        email,
        price,
        quantity,
        active
    })

    // products.push({
    //     _id,
    //     email,
    //     name,
    //     price,
    //     quantity,
    //     active
    // })
    
    const saveProduct = await product.save();

    return res.status(201).json({message:'products created successfully', 
    saveProduct    
    })
   //saveProduct
//    productID: _id,
//           name:req.body.name,
//             active:req.body.active,
//               quantity: req.body.quantity,
//                 price: req.body.price,
//                   email: req.body.email

} catch (error) {
    // if (error.code === 11000) {
    //     return res.status(400).json({ message: "Email already exists. . ." });
    // }
    return res.status(500).json({message: error.message})
}
}

//routers.get('/:_id', )
exports.getProductById = (req, res) => {
    
    const product = products.find(product => product._id == req.params._id)
    const productIndex = products.findIndex(product => product._id == req.params._id)
    console.log(productIndex)
    if(!product) {
        return res.status(404).json({message: 'Product not found'})
    }

    return res.status(200).json(product)
}


//routers.put('/:_id', )
exports.UpdateProductById = (req, res) => {
    const product = products.find(product => product._id == req.params._id)

    if(!product) {
        return res.status(404).json({message: 'Product not found'})
    }

    const {name, price, quantity, active} = req.body

    if(name) {
        product.name = name
    }
    if(price) {
        product.price = price
    }
    if(quantity) {
        product.quantity = quantity
    }
    if('active' in req.body) {
        product.active = active
    }

    return res.status(200).json({message: 'Product updated successfully'})
}

//routers.delete('/:_id', )
exports.DeleteProductById = async (req, res) => {
    try {
    const  productIndex = await CrudModel.findById(req.params._id);

    //const productIndex = await CrudModel.findIndex(CrudModel => CrudModel._id == req.params._id);
    //const productIDIndex = await CrudModel.findIndex(CrudModel => CrudModel.productID == req.params.productID);
    console.log(productIndex)
    //console.log(productIDIndex)

    
    if(!productIndex) {
        return res.status(404).json({message: 'Product not found'})
    }

    // if(productIndex == -1) {
    //     return res.status(402).json({message: 'Product not found'})
    // }

    // if(productIDIndex == -1) {
    //     return res.status(402).json({message: 'Product not found'})
    // }

    //const DeleteProduct = await CrudModel.findIndex(CrudModel => CrudModel._id == req.params._id)
    //products.splice(DeleteProduct, 1)
    const DeleteProduct = await CrudModel.deleteOne({ _id: req.params._id });

    return res.status(200).json({message: 'Product deleted successfully',name:DeleteProduct.name, price:DeleteProduct.price, quantity:DeleteProduct.quantity, active:DeleteProduct.active})
} catch (error) {
    return res.status(500).json({message: error.message})
}
}

exports.DeleteProductIDById = async (req, res) => {
    try {
        
        const  productIndexID = await CrudModel.findOne({ productID: req.params.productID});
        console.log(productIndexID)

    
    if(!productIndexID) {
        return res.status(404).json({message: 'Product not found'})
    }
    
    const DeleteProductResult = await CrudModel.deleteOne({ productID: req.params.productID });
    
    // if (DeleteProductResult.deletedCount === 0) {
    //                  return res.status(500).json({ message: 'Failed to delete the product' });
    //              }
    return res.status(200).json({
                     message: 'Product deleted successfully',
                     deletedProductID: req.params.productID
                 });

    
    
} catch (error) {
    return res.status(500).json({message: error.message})
}
}

// exports.DeleteProductIDById = async (req, res) => {
//     try {
//         // Find the product by productID
//         const product  = await CrudModel.findOne({ productID: req.params.productID });
// console.log(product)
//         // Check if the product exists
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Delete the product using productID
//         const deleteResult = await CrudModel.deleteOne({ productID: req.params.productID });

//         // Check if the deletion was successful
//         if (deleteResult.deletedCount === 0) {
//             return res.status(500).json({ message: 'Failed to delete the product' });
//         }

//         // Return the deleted product details
//         return res.status(200).json({
//             message: 'Product deleted successfully',
//             deletedProductID: req.params.productID
//         });
        
//     } catch (error) {
//         // Handle any errors that occur
//         return res.status(500).json({ message: error.message });
//     }
// };
