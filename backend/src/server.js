import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seedData.js';
import Product from './models/Product.js';

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
connectDB().then(async () => {
  // Check if database is empty; if so, seed automatically for instant developer experience!
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log('[Auto-Seed] No products detected in database. Running initial seed...');
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`[Server] Aura Store Backend API running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('[Server Startup Error]', err);
});
