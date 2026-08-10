const categories = ['electronics', 'fashion', 'home-living', 'fitness'];
const templates = {
  electronics: [
    {name: 'Horizon Echo Portable Speaker', sub: 'Audio', brand: 'Horizon Audio', images: ['https://images.unsplash.com/photo-1517359005562-216c34d74d55?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80']},
    {name: 'Nebula Pro 13-inch Ultralight Laptop', sub: 'Laptops', brand: 'Nebula Tech', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80']},
    {name: 'PulseBeam Smart Home Security Camera', sub: 'Smart Home', brand: 'PulseBeam', images: ['https://images.unsplash.com/photo-1552438418-18853d959234?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512406805801-0f7f6a6ade3b?auto=format&fit=crop&w=800&q=80']},
    {name: 'Fusion 65W USB-C Fast Charger', sub: 'Accessories', brand: 'Fusion Charge', images: ['https://images.unsplash.com/photo-1510557880182-3f8ed2d2c97e?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80']},
    {name: 'AeroWave Noise-Isolating Earbuds', sub: 'Audio', brand: 'AeroWave', images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1516728778615-2d590ea1856f?auto=format&fit=crop&w=800&q=80']},
    {name: 'Titanium Flex Fitness Tracker', sub: 'Wearables', brand: 'TitanFit', images: ['https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80']}
  ],
  fashion: [
    {name: 'Metro Classic Leather Wallet', sub: 'Accessories', brand: 'Metro Luxe', images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80']},
    {name: 'Urban Breeze Oversized Denim Jacket', sub: 'Jackets', brand: 'Urban Breeze', images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c5d8?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80']},
    {name: 'Luxe Knit Cashmere Scarf', sub: 'Accessories', brand: 'LuxeWear', images: ['https://images.unsplash.com/photo-1519741498924-4afd5d84c6ff?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80']},
    {name: 'Eclipse Performance Running Tights', sub: 'Streetwear', brand: 'Eclipse Sport', images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80']},
    {name: 'Vivid Bloom Satin Slip Dress', sub: 'Streetwear', brand: 'Vivid', images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80']},
    {name: 'Slate Mesh Trainer Shoes', sub: 'Sneakers', brand: 'Slate', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80']}
  ],
  'home-living': [
    {name: 'Calypso Ceramic Air Purifier', sub: 'Decor', brand: 'Calypso Home', images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80']},
    {name: 'Nordic Linen Throw Blanket', sub: 'Furniture', brand: 'Nordic Nest', images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80']},
    {name: 'Mira Wall-Mount Floating Shelf', sub: 'Decor', brand: 'Mira Living', images: ['https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80']},
    {name: 'Essence Smart Aroma Lamp', sub: 'Lighting', brand: 'Essence Home', images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80']},
    {name: 'Harbor Bamboo Bath Mat', sub: 'Decor', brand: 'Harbor Home', images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80']},
    {name: 'Lumina Geometry Table Clock', sub: 'Decor', brand: 'Lumina Home', images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80']}
  ],
  fitness: [
    {name: 'Stride Elite Smart Running Shoes', sub: 'Wearables', brand: 'Stride', images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80']},
    {name: 'AeroCore Foldable Yoga Mat', sub: 'Yoga & Mat', brand: 'AeroCore', images: ['https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80']},
    {name: 'HydroMax Insulated Protein Shaker', sub: 'Accessories', brand: 'HydroMax', images: ['https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80']},
    {name: 'CoreFlex Adjustable Kettlebell', sub: 'Fitness', brand: 'CoreFlex', images: ['https://images.unsplash.com/photo-1594737625785-9dfb0d44d7d8?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80']},
    {name: 'SprintX Digital Jump Rope', sub: 'Fitness', brand: 'SprintX', images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80']},
    {name: 'BalancePro Smart Stability Ball', sub: 'Yoga & Mat', brand: 'BalancePro', images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80']}
  ]
};

const entries = [];
for (const cat of categories) {
  const templateSet = templates[cat];
  for (let i = 1; i <= 13; i++) {
    const template = templateSet[(i - 1) % templateSet.length];
    const name = `${template.name} ${i}`;
    const slug = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-')} ${i}`.trim().replace(/\s+/g, '-');
    const price = 2999 + i * (cat === 'electronics' ? 850 : cat === 'fashion' ? 600 : cat === 'home-living' ? 550 : 500);
    const discountPrice = Math.max(1999, price - 1200 - i * 50);
    const stock = 12 + i * 2;
    const rating = Number((4.1 + (i % 5) * 0.13).toFixed(1));
    const numReviews = 10 + i * 2;
    entries.push({
      name,
      slug,
      description: `${template.name} ${i} blends premium craftsmanship with elegant utility for a refined everyday experience.`,
      shortDescription: `Premium ${template.sub.toLowerCase()} item designed for style and comfort.`,
      price,
      discountPrice,
      category: `categoryMap['${cat}']`,
      subCategory: template.sub,
      brand: template.brand,
      images: template.images,
      stock,
      sku: `${template.brand.slice(0,3).toUpperCase()}-${String(i).padStart(3, '0')}`,
      specifications: [
        { key: 'Feature', value: `Elite ${template.sub}` },
        { key: 'Material', value: `${template.brand} Grade` }
      ],
      features: ['Durable design', 'Premium finish', 'Easy maintenance'],
      rating,
      numReviews,
      isFeatured: i % 4 === 0,
      isBestSeller: i % 5 === 0
    });
  }
}

for (const product of entries) {
  console.log('      {');
  console.log(`        name: '${product.name}',`);
  console.log(`        slug: '${product.slug}',`);
  console.log(`        description: '${product.description}',`);
  console.log(`        shortDescription: '${product.shortDescription}',`);
  console.log(`        price: ${product.price},`);
  console.log(`        discountPrice: ${product.discountPrice},`);
  console.log(`        category: ${product.category},`);
  console.log(`        subCategory: '${product.subCategory}',`);
  console.log(`        brand: '${product.brand}',`);
  console.log('        images: [');
  for (const url of product.images) {
    console.log(`          '${url}',`);
  }
  console.log('        ],');
  console.log(`        stock: ${product.stock},`);
  console.log(`        sku: '${product.sku}',`);
  console.log('        specifications: [');
  for (const spec of product.specifications) {
    console.log(`          { key: '${spec.key}', value: '${spec.value}' },`);
  }
  console.log('        ],');
  console.log(`        features: [
          'Durable design',
          'Premium finish',
          'Easy maintenance'
        ],`);
  console.log(`        rating: ${product.rating},`);
  console.log(`        numReviews: ${product.numReviews},`);
  console.log(`        isFeatured: ${product.isFeatured},`);
  console.log(`        isBestSeller: ${product.isBestSeller}`);
  console.log('      },');
}
