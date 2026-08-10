import Product from '../models/Product.js';
import Category from '../models/Category.js';

// @desc Fetch all products with search, filter, sort & pagination
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    const query = { isActive: true };

    // Search term
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { brand: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Category filter (by slug or ObjectId)
    if (req.query.category) {
      if (req.query.category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = req.query.category;
      } else {
        const cat = await Category.findOne({ slug: req.query.category });
        if (cat) query.category = cat._id;
      }
    }

    // Brand filter
    if (req.query.brand) {
      const brands = req.query.brand.split(',');
      query.brand = { $in: brands.map(b => new RegExp(b.trim(), 'i')) };
    }

    // Price Filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Rating Filter
    if (req.query.rating) {
      query.rating = { $gte: Number(req.query.rating) };
    }

    // Discount Filter
    if (req.query.minDiscount) {
      query.discountPercentage = { $gte: Number(req.query.minDiscount) };
    }

    // In Stock filter
    if (req.query.inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // Default newest
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-low':
          sortOptions = { price: 1 };
          break;
        case 'price-high':
          sortOptions = { price: -1 };
          break;
        case 'rating':
          sortOptions = { rating: -1 };
          break;
        case 'popular':
          sortOptions = { numReviews: -1 };
          break;
        case 'discount':
          sortOptions = { discountPercentage: -1 };
          break;
        case 'newest':
        default:
          sortOptions = { createdAt: -1 };
          break;
      }
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Get list of unique brands for filter options
    const allBrands = await Product.distinct('brand', { isActive: true });

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
      brands: allBrands
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get search suggestions
// @route GET /api/products/suggestions
export const getSearchSuggestions = async (req, res) => {
  try {
    const keyword = req.query.q ? req.query.q.trim() : '';
    if (!keyword) return res.json([]);

    const products = await Product.find({
      isActive: true,
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } }
      ]
    }).select('name brand slug images price discountPrice category').limit(6);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product by slug or id
// @route GET /api/products/:identifier
export const getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    let product;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier).populate('category', 'name slug');
    } else {
      product = await Product.findOne({ slug: identifier }).populate('category', 'name slug');
    }

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get featured products
// @route GET /api/products/featured
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate('category', 'name slug')
      .limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get best sellers
// @route GET /api/products/bestsellers
export const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true, isActive: true })
      .populate('category', 'name slug')
      .limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create product (Admin)
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subCategory,
      brand,
      images,
      stock,
      sku,
      specifications,
      features,
      isFeatured,
      isBestSeller,
    } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

    const product = new Product({
      name,
      slug,
      description,
      shortDescription: shortDescription || description.slice(0, 150),
      price,
      discountPrice: discountPrice || 0,
      category,
      subCategory: subCategory || '',
      brand,
      images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'],
      stock: stock || 0,
      sku: sku || `SKU-${Date.now()}`,
      specifications: specifications || [],
      features: features || [],
      isFeatured: isFeatured || false,
      isBestSeller: isBestSeller || false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product (Admin)
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, req.body);
    if (req.body.name) {
      product.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + product._id.toString().slice(-4);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete product (Admin)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
