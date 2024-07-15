const db = require('../config/connection');
const collection = require('../config/collections');
const { ObjectID } = require('mongodb');

module.exports = {
    addProduct: (product, callback) => {
        db.get().collection(collection.PRODUCT_COLLECTION)
            .insertOne(product)
            .then((data) => {
                console.log('Product added:', data.ops[0]);
                callback(data.ops[0]._id);
            })
            .catch((err) => {
                console.error('Error adding product:', err);
                callback(null); // Handle error as needed
            });
    },

    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
                resolve(products);
            } catch (err) {
                console.error('Error fetching products:', err);
                reject(err); // Propagate error
            }
        });
    },

    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION)
                .deleteOne({ _id: ObjectID(prodId) })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    console.error('Error deleting product:', err);
                    reject(err); // Propagate error
                });
        });
    },

    getProductDetails: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION)
                .findOne({ _id: ObjectID(prodId) })
                .then((product) => {
                    resolve(product);
                })
                .catch((err) => {
                    console.error('Error fetching product details:', err);
                    reject(err); // Propagate error
                });
        });
    },

    updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION)
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
                )
                .then((response) => {
                    resolve();
                })
                .catch((err) => {
                    console.error('Error updating product:', err);
                    reject(err); // Propagate error
                });
        });
    },
};
