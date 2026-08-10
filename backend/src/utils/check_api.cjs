const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
(async () => {
  try {
    const base = 'http://localhost:5000/api';
    const endpoints = ['/categories', '/products', '/products/featured', '/products/bestsellers'];
    for (const ep of endpoints) {
      const res = await fetch(base + ep);
      console.log(ep, res.status);
      const data = await res.text();
      console.log(data.slice(0, 400));
      console.log('---');
    }
    const prods = await fetch(base + '/products');
    const prodData = await prods.json();
    if (Array.isArray(prodData.products) && prodData.products.length) {
      const p = prodData.products[0];
      console.log('first product', p.slug, p.images && p.images.length, p.category && p.category.name);
      const single = await fetch(`${base}/products/${p.slug}`);
      console.log('single status', single.status);
      console.log(await single.text());
    }
  } catch (err) {
    console.error(err);
  }
})();