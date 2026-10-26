// Sample catalogue for the prototype. Every product, shop and price here is made up.

/** @typedef {'budget' | 'top' | 'gaming' | 'tablet' | 'acc'} Subcategory */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} spec
 * @property {number} price   Selling price in rupees
 * @property {number} mrp     List price in rupees, shown struck through
 * @property {Subcategory[]} subcategories
 * @property {'phone' | 'tablet'} form
 * @property {string} shopId  The nearest shop that has it in stock
 * @property {string} screen  CSS gradient used to draw the device
 */

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: 'nova',
    name: 'Nova 5G Lite',
    spec: '6 GB RAM · 128 GB · 50 MP camera · 5000 mAh',
    price: 12999,
    mrp: 15999,
    subcategories: ['budget'],
    form: 'phone',
    shopId: 'balaji',
    screen: 'linear-gradient(160deg,#B9E3D3,#3B8F7A)',
  },
  {
    id: 'kestrel',
    name: 'Kestrel A15',
    spec: '8 GB RAM · 128 GB · 6.7" AMOLED',
    price: 14499,
    mrp: 17999,
    subcategories: ['budget'],
    form: 'phone',
    shopId: 'metro',
    screen: 'linear-gradient(160deg,#FFD9A8,#E0703A)',
  },
  {
    id: 'orbit',
    name: 'Orbit Play 5G',
    spec: '8 GB RAM · 256 GB · 120 Hz · gaming cooler',
    price: 19499,
    mrp: 22999,
    subcategories: ['gaming', 'budget'],
    form: 'phone',
    shopId: 'balaji',
    screen: 'linear-gradient(160deg,#7B5CFF,#1D1060)',
  },
  {
    id: 'vela',
    name: 'Vela 8 Pro',
    spec: '8 GB RAM · 256 GB · OIS camera · 80 W charging',
    price: 24999,
    mrp: 28999,
    subcategories: ['top'],
    form: 'phone',
    shopId: 'metro',
    screen: 'linear-gradient(160deg,#F7C6D9,#B0336A)',
  },
  {
    id: 'zenith',
    name: 'Zenith Pro 12',
    spec: '12 GB RAM · 256 GB · triple camera',
    price: 34999,
    mrp: 39999,
    subcategories: ['top'],
    form: 'phone',
    shopId: 'lakshmi',
    screen: 'linear-gradient(160deg,#E8E4F0,#8E86A3)',
  },
  {
    id: 'pad',
    name: 'Tabla Pad 11',
    spec: '11" display · 8 GB RAM · 128 GB · pen support',
    price: 16999,
    mrp: 19999,
    subcategories: ['tablet'],
    form: 'tablet',
    shopId: 'metro',
    screen: 'linear-gradient(160deg,#BFD7FF,#3D6FD1)',
  },
];

/** Local shops that already accept PhonePe and act as sellers. */
export const SHOPS = {
  balaji: { name: 'Sri Balaji Mobiles', address: '100 Feet Road, Indiranagar', distance: '1.2 km' },
  metro: { name: 'Metro Digital World', address: 'CMH Road, Indiranagar', distance: '2.4 km' },
  lakshmi: { name: 'Lakshmi Electronics', address: 'Domlur Layout', distance: '3.1 km' },
};

/** Budget bands, matching how people search ("best phone under 15000"). */
export const BUDGETS = [
  { id: 'u15', label: 'Under ₹15k', min: 0, max: 15000 },
  { id: '15-20', label: '₹15k to 20k', min: 15000, max: 20000 },
  { id: '20-30', label: '₹20k to 30k', min: 20000, max: 30000 },
  { id: '30+', label: '₹30k and above', min: 30000, max: Infinity },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const getShop = (product) => SHOPS[product.shopId];
export const getBudget = (id) => BUDGETS.find((b) => b.id === id) ?? null;
