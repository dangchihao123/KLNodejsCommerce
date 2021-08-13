const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema({
    name: { type: String, required: false },
    category: { type: String, required: false },
    image: { type: String, required: false },
    price: { type: Number, required: false },
    brand: { type: String, required: false },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true },
    reviews: [reviewSchema],
}, {
    timestamps: true,
}
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;