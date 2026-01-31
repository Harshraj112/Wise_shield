# 🛡️ WiseShield AI - Phishing Detection Website

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

WiseShield AI is a cutting-edge browser extension that uses machine learning to detect and prevent phishing attacks in real-time. This repository contains the official marketing website built with Next.js.

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations using Framer Motion
- **Interactive Demo**: Live URL analysis demonstration
- **Backend Integration**: Ready-to-connect API routes for ML model integration
- **SEO Optimized**: Proper meta tags, semantic HTML, and performance optimization
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode Ready**: Clean, professional design system

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12.29.2
- **Icons**: React Icons
- **Language**: TypeScript 5
- **Font**: Bitcount Single (Google Fonts)

## 📁 Project Structure

```
wiseshield-website/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/             # About page
│   │   ├── api/               # API routes
│   │   │   └── analyze-url/   # URL analysis endpoint
│   │   ├── blog/              # Blog page
│   │   ├── contact/           # Contact page
│   │   ├── download/          # Download/installation guide
│   │   ├── how-it-works/      # How it works page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── LiveDemo.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   └── ...
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── Footer.tsx         # Footer component
│   └── lib/                   # Utility libraries
│       ├── urlAnalysis.ts     # URL feature extraction
│       └── urlAnalysisIntegration.ts  # Backend integration
├── public/                    # Static assets
│   ├── wiseshield-logo.png
│   └── hero-bg.png
├── .env.local                 # Environment variables (not in git)
├── .env.example              # Environment variables template
├── tailwind.config.ts        # Tailwind configuration
└── package.json              # Dependencies

```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Harshraj112/Wise_shield.git
   cd Wise_shield
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your backend URL:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   BACKEND_URL=http://localhost:5000
   BACKEND_API_KEY=your-api-key-here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 Backend Integration

The website includes a Next.js API route (`/api/analyze-url`) that connects to your ML backend:

### URL Analysis Flow

1. User enters URL in the Live Demo section
2. Frontend extracts 8 security features from the URL
3. POST request sent to `/api/analyze-url`
4. API route forwards data to ML backend
5. Backend returns risk assessment
6. Results displayed to user

### Features Extracted

- URL length
- Number of dots
- Number of hyphens
- Phishing keywords presence
- IP address detection
- Subdomain length
- Digit ratio
- HTTPS presence

See `BACKEND_INTEGRATION.md` for detailed documentation.

## 📄 Pages

- **Home** (`/`) - Hero, features, live demo, how it works
- **About** (`/about`) - Company information and mission
- **How It Works** (`/how-it-works`) - Technical deep dive
- **Download** (`/download`) - Installation guide
- **Blog** (`/blog`) - Articles and updates
- **Contact** (`/contact`) - Contact form

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Accent**: Teal (#14b8a6), Green (#22c55e)
- **Text**: Gray scale (900, 600, 500)

### Typography

- **Headings**: Bitcount Single (custom font)
- **Body**: System font stack

### Components

- Animated buttons with hover effects
- Gradient cards with glassmorphism
- Smooth page transitions
- Interactive comparison tables

## 🔒 Security Features Highlighted

- ✅ 99.2% Detection Rate (XGBoost model)
- ✅ Real-time URL scanning
- ✅ AI/ML-powered analysis
- ✅ Privacy-first approach
- ✅ Zero-day threat protection
- ✅ Free forever

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized images and assets

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

```bash
npm run build
npm run start
```

Deploy the `.next` folder to your hosting provider.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Harsh Raj**

- GitHub: [@Harshraj112](https://github.com/Harshraj112)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- React Icons for beautiful icons

## 📞 Support

For support, email support@wiseshield.ai or open an issue on GitHub.

---

**Made with ❤️ by Harsh Raj**
