# BottlesUp Website

**Toronto's Premier Nightlife App Landing Page**

A professional landing page for BottlesUp - the ultimate VIP table booking and digital ticket platform for Toronto's hottest venues.

## 🌟 Features

- **Loading Video**: Custom loading experience with your brand video
- **VIP Waitlist Signup**: Mailchimp integration for email collection
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Mobile-First Design**: Responsive design that works on all devices
- **PWA Ready**: Installable web app with manifest and service worker ready
- **Professional Animations**: Smooth transitions and hover effects
- **Toronto-Focused**: Location-specific content for Toronto nightlife

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start with backend (for Mailchimp integration)
npm run dev:full
```

Visit `http://localhost:8081` to see your site.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
bottlesup-website/
├── public/
│   ├── app_logo.svg          # Your BottlesUp logo (add this)
│   ├── loading_video.mp4     # Your loading video (add this)
│   ├── sitemap.xml          # SEO sitemap
│   ├── robots.txt           # Search engine instructions
│   └── manifest.json        # PWA manifest
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation with logo
│   │   ├── Hero.tsx         # Main hero section
│   │   ├── Features.tsx     # Core features showcase
│   │   ├── EmailCollection.tsx # Waitlist signup
│   │   ├── Footer.tsx       # Footer with contact info
│   │   └── LoadingScreen.tsx # Video loading screen
│   ├── pages/
│   │   └── Index.tsx        # Main landing page
│   └── lib/
│       └── mailchimp.ts     # Mailchimp integration
├── server.js               # Express server for Mailchimp API
├── vercel.json            # Vercel deployment config
└── DEPLOYMENT.md          # Deployment guide
```

## 🎨 Customization

### Adding Your Assets

1. **Logo**: Add `app_logo.svg` to the `public` folder
2. **Loading Video**: Add `loading_video.mp4` to the `public` folder
3. **Branding**: Update colors in `src/index.css` if needed

### Mailchimp Setup

1. Follow the guide in `MAILCHIMP_SETUP.md`
2. Create a `.env` file with your Mailchimp credentials
3. Start the backend server with `npm run server`

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (automatically detected)
   - Deploy!

3. **Custom Domain** (Optional):
   - Add your domain in Vercel dashboard
   - Update DNS settings as instructed

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📊 SEO Features

- ✅ **Meta Tags**: Complete Open Graph and Twitter Cards
- ✅ **Structured Data**: Schema.org markup for better search results
- ✅ **Sitemap**: XML sitemap for search engines
- ✅ **Robots.txt**: Search engine crawling instructions
- ✅ **Canonical URLs**: Proper URL canonicalization
- ✅ **Mobile Optimization**: Mobile-first responsive design

## 📱 Progressive Web App

- ✅ **Web App Manifest**: Installable on mobile devices
- ✅ **Theme Colors**: Branded colors for mobile browsers
- ✅ **App Shortcuts**: Quick access to key sections
- ✅ **Offline Ready**: Ready for service worker implementation

## 🔧 Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **Mailchimp API** for email collection
- **Express.js** for backend API

## 📧 Contact & Support

For questions about the BottlesUp website:
- **Email**: hello@bottlesup.to
- **Developers**: dev@bottlesup.to

For venue partnerships and promoter inquiries:
- **Partners**: partners@bottlesup.to
- **Promoters**: promoters@bottlesup.to

## 🎯 Toronto Nightlife

This website is specifically designed for Toronto's vibrant nightlife scene, featuring:
- Entertainment District venues
- King Street West hotspots  
- Queen Street West locations
- Financial District bars
- Yorkville lounges
- And more across the GTA!

---

**Built for Toronto's Nightlife Revolution** 🍾
