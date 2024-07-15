const db = require('../config/connection');
const collection = require('../config/collections');
const { ObjectID } = require('mongodb');

module.exports = {
    addProduct: (product, callback) => {
        db.get()
            .collection(collection.PRODUCT_COLLECTION)
            .insertOne(product)
            .then((data) => {
                console.log('Product added:', data.ops[0]);
                callback(data.ops[0]._id);
            })
            .catch((err) => {
                console.error('Error adding product:', err);
                callback(null); // or handle error as needed
            });
    },

    getAllProducts: async () => {
        try {
            let products = await db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .find()
                .toArray();
            return products;
        } catch (err) {
            console.error('Error fetching products:', err);
            return []; // or throw error as needed
        }
    },

    deleteProduct: async (prodId) => {
        try {
            let response = await db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .deleteOne({ _id: ObjectID(prodId) });
            return response;
        } catch (err) {
            console.error('Error deleting product:', err);
            throw err; // or handle error as needed
        }
    },

    getProductDetails: async (prodId) => {
        try {
            let product = await db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .findOne({ _id: ObjectID(prodId) });
            return product;
        } catch (err) {
            console.error('Error fetching product details:', err);
            throw err; // or handle error as needed
        }
    },

    updateProduct: async (proId, proDetails) => {
        try {
            let response = await db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne(
                    { _id: ObjectID(proId) },
                    {
                        $set: {
                            Name: proDetails.Name,
                            Description: proDetails.Description,
                            Price: proDetails.Price,
                            Category: proDetails.Category,
                        },
                    }
                );
            return response;
        } catch (err) {
            console.error('Error updating product:', err);
            throw err; // or handle error as needed
        }
    },
};

   
