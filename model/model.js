const mongoose = require('mongoose');


const modelSchema = mongoose.Schema({ 
    productID: {
        type: String
    },
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    active: {
        type: Boolean
    }
 });

 const Crudmodel = mongoose.model('crud', modelSchema);

module.exports = Crudmodel;