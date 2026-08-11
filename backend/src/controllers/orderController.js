import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Coupon from '../models/Coupon.js';

// @desc Create new order
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode, transactionId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    if (!shippingAddress || !shippingAddress.houseNo || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ message: 'Incomplete shipping address provided' });
    }

    let subtotal = 0;
    const verifiedItems = [];

    // Security Rule 20: Recalculate price on backend, verify stock
    for (const item of items) {
      const productId = item.product?._id || item.product;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.name || item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Item "${product.name}" out of stock. Available: ${product.stock}` });
      }

      const itemPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
      subtotal += itemPrice * item.quantity;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images[0] : '',
        price: itemPrice,
        quantity: item.quantity
      });
    }

    // Handle Coupon Discount Verification
    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon && new Date() <= coupon.expiryDate && subtotal >= coupon.minimumOrderValue) {
        if (coupon.discountType === 'percentage') {
          discount = (subtotal * coupon.discountValue) / 100;
          if (coupon.maximumDiscount > 0 && discount > coupon.maximumDiscount) {
            discount = coupon.maximumDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
        // Increment coupon usage count
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    const shippingFee = subtotal > 1000 ? 0 : 50; // Free shipping over 1000
    const tax = Math.round((subtotal - discount) * 0.18); // 18% tax
    const totalAmount = Math.max(0, subtotal - discount + shippingFee + tax);

    const paymentStatus = paymentMethod === 'Stripe Online Payment' ? 'Completed' : 'Pending';

    const order = new Order({
      user: req.user._id,
      items: verifiedItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      subtotal,
      discount,
      shippingFee,
      tax,
      totalAmount,
      couponCode: couponCode || '',
      transactionId: transactionId || (paymentMethod === 'Cash on Delivery' ? `COD-${Date.now()}` : ''),
    });

    const createdOrder = await order.save();

    // Deduct Stock
    for (const item of verifiedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear User Cart after successful order creation
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], subtotal: 0 });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in user orders
// @route GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order details by ID
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Ensure user is order owner or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Cancel order
// @route PUT /api/orders/:id/cancel
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    if (['Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({ message: `Cannot cancel order in state: ${order.orderStatus}` });
    }

    order.orderStatus = 'Cancelled';
    order.cancelledAt = Date.now();
    await order.save();

    // Restock product items
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders (Admin)
// @route GET /api/orders/admin/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update order status (Admin)
// @route PUT /api/orders/admin/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = status;
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
      order.paymentStatus = 'Completed';
    } else if (status === 'Cancelled') {
      order.cancelledAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
