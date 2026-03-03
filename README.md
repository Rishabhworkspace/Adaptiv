##BHANG BHOSDA
# Adaptive Portfolio

An AI-powered, meticulously crafted portfolio application designed to adapt its content dynamically to different recruiters and companies. Built to showcase a blend of modern design aesthetics, bleeding-edge web technologies, and artificial intelligence.

## Features

- **AI Content Generation (`@google/generative-ai` & Vercel AI SDK):** Input a target company and role, and the portfolio intelligently restructures the "Why Choose Me" arguments and highlights specific skills relevant to that position.
- **Dynamic PDF Resume Builder:** Features a highly polished, two-column PDF resume generator using `@react-pdf/renderer` that perfectly mirrors the web portfolio's content, complete with ATS-friendly formatting and matching AI-contextualized data. 
- **Premium UI/UX:** Glassmorphic elements, modern typography (text-wrap balancing), subtle micro-animations (Framer Motion), and a meticulously balanced dark/light theme ecosystem tailored for visual excellence.
- **Production Grade Performance:** Built on Next.js 16 (Turbopack) leveraging modern caching semantics and performance callbacks (`useCallback`) to guarantee blisteringly fast renders and robust hydration.
- **Strict Accessibility (a11y):** Formulated with semantic HTML, precise ARIA labels, focus-visible states for keyboard navigation, and reduced-motion support.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS modularization
- **Animations:** Framer Motion
- **AI Integration:** Google Gemini API / Vercel AI SDK
- **PDF Generation:** `@react-pdf/renderer`
- **Icons:** `lucide-react`
- **Typography:** Geist / Helvetica (PDF)

## Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd adaptive-portfolio
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your Gemini API Key. The AI personalization feature requires this key to function:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the portfolio.

## Usage

1. **Viewing:** The landing page serves as your core portfolio, highlighting experiences, education, and projects.
2. **Personalization:** Navigate to `/generate` to input a target `"Company Name"` and `"Role"`. The app will query Gemini to tailor your pitch and provide you with a custom shareable link.
3. **PDF Export:** Once personalized, navigate to the "Why Choose Me" section and click the native download button to generate a tailored `.pdf` resume on the fly.