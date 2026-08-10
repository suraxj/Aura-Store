const fs = require('fs');
const text = fs.readFileSync('seedData.js', 'utf8');
const blocks = text.split(/\n\s*}\s*,?\s*\n/).filter((block) => block.includes("slug:'") || block.includes('slug: \'')).filter((block) => block.includes('price:'));
const bad = [];
for (const block of blocks) {
  const slugMatch = block.match(/slug:\s*'([^']+)'/);
  const slug = slugMatch ? slugMatch[1] : '<unknown>';
  const imgMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  const urls = imgMatch ? (imgMatch[1].match(/https?:\/\/[^'"\s]+/g) || []) : [];
  if (urls.length < 2) {
    bad.push({ slug, urls, hasImages: !!imgMatch, raw: block.trim().slice(0, 400) });
  }
}
console.log(JSON.stringify({ checked: blocks.length, bad }, null, 2));
