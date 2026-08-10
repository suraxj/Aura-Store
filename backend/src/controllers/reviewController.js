import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc Create new product review
// @route POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Please provide rating and comment' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if user has purchased the product
    const userOrder = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
    });

    if (!userOrder) {
      return res.status(400).json({ message: 'Only verified purchasers who ordered this product can write a review' });
    }

    // Check if review already exists
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      order: userOrder._id,
      name: req.user.name,
      avatar: req.user.avatar,
      rating: Number(rating),
      comment,
      isVerifiedPurchase: true,
    });

    // Update Product average rating
    const allReviews = await Review.find({ product: productId });
    product.numReviews = allReviews.length;
    product.rating = (allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length).toFixed(1);
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get reviews for a product
// @route GET /api/reviews/product/:productId
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete review (Admin)
// @route DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const productId = review.product;
    await review.deleteOne();

    // Recalculate product rating
    const allReviews = await Review.find({ product: productId });
    const product = await Product.findById(productId);
    if (product) {
      product.numReviews = allReviews.length;
      product.rating = allReviews.length > 0
        ? (allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length).toFixed(1)
        : 0;
      await product.save();
    }

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
