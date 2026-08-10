import express from 'express';
import {
  getProducts,
  getSearchSuggestions,
  getProductByIdentifier,
  getFeaturedProducts,
  getBestSellers,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/suggestions', getSearchSuggestions);
router.get('/featured', getFeaturedProducts);
router.get('/bestsellers', getBestSellers);
router.get('/:identifier', getProductByIdentifier);

router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
