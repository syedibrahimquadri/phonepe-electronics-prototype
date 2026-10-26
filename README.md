# PhonePe Electronics Marketplace Prototype

A clickable concept prototype of an electronics marketplace inside the PhonePe app. Shoppers can browse phones by budget, pick a no-cost EMI plan, add device protection or a trade-in, and pick up from a local shop the same day.

It comes from a personal product case study: 941 trending Google searches in India were sorted by buying intent, and electronics showed the strongest demand (24 of 28 searches were clear shopping searches).

> Personal case study by Syed Ibrahim Quadri. Not affiliated with or endorsed by PhonePe. Product names, shops and prices are made up, and nothing here takes real payments.

## The flow

1. **Home**: a new Electronics banner on the PhonePe home screen
2. **Electronics home**: shop by budget, wave 1 categories, shops near you
3. **Mobiles & Tablets**: subcategory chips, budget filter, EMI and pickup on every card
4. **Product page**: 3, 6 or 9 month EMI, device protection, exchange, pickup or delivery
5. **Pay**: no-cost EMI, UPI or pay later
6. **Order placed**: pickup code for the local shop

## Run it locally

You need Node.js 18 or later.

```bash
npm install
npm run dev      # opens at http://localhost:5173
npm test         # pricing and filter tests
npm run build    # production build in dist/
```

## Project structure

All files sit in one folder, so the project can be uploaded to GitHub straight from the browser.

```
index.html          All six screens and the guide panel
main.js             Entry point: wires the screens together
state.js            Shared state (filters, selected product, choices)
navigation.js       Screen stack, slide transitions, back and jump
fit.js              Shrinks the phone to fit short desktop windows
pricing.js          Pure logic: totals, EMI, budget filters, ₹ formatting
catalog.js          Sample products, shops and budget bands
category.js         Screen: chips, budget filter, product list
product.js          Screen: EMI plans, add-ons, fulfilment, running total
checkout.js         Screen: order summary, payment method, order placed
index.css           Imports the stylesheets below
base.css            Design tokens, reset and page layout
rail.css, phone.css, responsive.css
home.css, store.css, category.css, product.css, pay.css, done.css
pricing.test.js     Unit tests for pricing.js
favicon.svg, og-image.png   Tab icon and social preview image
```

## Deploy on Vercel

**From GitHub (recommended)**

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository.
3. Vercel detects Vite. Keep the defaults (build command `npm run build`, output folder `dist`) and click **Deploy**.

Every push to the main branch redeploys the site.

**From your computer**

```bash
npm install -g vercel
vercel          # first deploy, answer the prompts
vercel --prod   # publish to your production URL
```

The social preview image uses the production URL automatically on Vercel. To use a custom domain, set a `SITE_URL` environment variable in Vercel (for example `https://prototype.example.com`) and redeploy.
