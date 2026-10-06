# Shree Balaji Industries — Website

Next.js 14 · React Three Fiber · Framer Motion · Tailwind · Lenis smooth scroll.

**Structure:** HOME → ABOUT US → CONTACT US, with an **INQUIRE** button in the header
that opens the inquiry form on the Contact Us page (`/contact#inquiry`). There is no
separate Works or Inquiry page.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Home page story (app/page.tsx)

Cinematic entry (photo/film + title sequence) → 3D counting numerals → introduction →
sideways 3D showcase (vertical scroll moves the work horizontally) → Our Craft →
scroll-drawn architectural site measurement → Selected Work (Kitchens, Wardrobes,
Cupboards, Doors & Chowkhats) → Before → After woodwork → Begin Your Inquiry → Contact/footer.

## Everything you will want to edit is in `lib/data.ts`

- **Photos:** `IMG` — change a URL or point to a file in `/public/images`. Use large originals
  (2400px+ wide); sizes and crops are handled by `next/image` and the WebGL cover-fit.
- **Hero film:** set `hero.video` to `/videos/hero.mp4` (put the file in `public/videos`).
- **Numerals:** `numerals` — currently describes how you work (4 product lines, 5 stages, 1:1 scale).
  No business statistics are invented; add real ones when you have them.
- **Site drawing values:** `planValues` — change the millimetre values and labels; the drawing updates.
- **Before / After:** `beforeAfter` — replace with a real pair of your own work.
- **Contact details, leadership:** `company`.
- **Light / dark theme:** toggle in the header; palette is defined once in `app/globals.css`.

## Backend & Database (MongoDB)

- **Database driver:** Mongoose (`mongoose`) with serverless cached connection pool in [`lib/mongodb.ts`](file:///c:/Users/MAYANK%20DHIMAN/Downloads/shree-balaji-industries-website_updated%20(2)/sbi-site/lib/mongodb.ts).
- **Inquiry Model:** [`models/Inquiry.ts`](file:///c:/Users/MAYANK%20DHIMAN/Downloads/shree-balaji-industries-website_updated%20(2)/sbi-site/models/Inquiry.ts) stores `name`, `phone`, `email`, `service`, `message`, and timestamp.
- **API Endpoints:**
  - `POST /api/inquiry`: Validates customer inquiry and saves it to MongoDB.
  - `GET /api/inquiry`: Retrieves inquiries.
  - `GET /api/health`: Health-check endpoint testing database connection state.
- **Admin Inquiries Dashboard:** Access `/admin/inquiries` in your browser to view incoming leads.
- **Environment Setup:** Add your MongoDB Atlas connection string to `.env.local`:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shree_balaji_industries?retryWrites=true&w=majority
  ```

## Notes

- Photos are Unsplash stock (free licence) until you replace them with your own.
- The inquiry form now directly posts to `/api/inquiry` and saves inquiries to MongoDB.
- `public/textures/hardwood.jpg` and the numeral font subset come from the three.js project (MIT).
