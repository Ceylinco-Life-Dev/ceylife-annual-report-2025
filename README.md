<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:f5a623,100:1a1a2e&height=200&section=header&text=Ceylife%20Annual%20Report%202025&fontSize=38&fontColor=ffffff&fontAlignY=38&desc=An%20Immersive%20Digital%20Annual%20Report%20Experience&descAlignY=58&descSize=16&animation=fadeIn" width="100%"/>

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=F5A623&center=true&vCenter=true&multiline=true&repeat=true&width=700&height=80&lines=✦+Powered+by+Next.js+16+%26+TypeScript;✦+AI-driven+Compass+Chatbot+Experience;✦+Cinematic+Splash+%7C+Star+Cursor+%7C+Scroll+Animations)](https://git.io/typing-svg)

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)

</div>

---

<div align="center">

## ✨ What is this?

</div>

> **Ceylife Annual Report 2025** is not just a report — it's a **cinematic, scroll-driven digital experience** that brings Ceylife Insurance's 2025 annual report to life through immersive animations, an AI-powered assistant, and a rich storytelling interface.

---

<div align="center">

## 🎬 Experience Highlights

</div>

<table>
<tr>
<td align="center" width="25%">

**🌟 Splash Screen**<br/>
Cinematic entrance with a full-screen animated intro before the main experience begins

</td>
<td align="center" width="25%">

**🧭 CompassAI**<br/>
An AI-powered floating chatbot that answers questions about the annual report in real time

</td>
<td align="center" width="25%">

**⭐ Star Cursor**<br/>
Custom star-trail cursor that follows your mouse for a premium, magical feel

</td>
<td align="center" width="25%">

**📽️ Hero Video**<br/>
Cinematic background video loop with layered content, fade-ins, and scroll triggers

</td>
</tr>
</table>

---

<div align="center">

## 🗺️ Page Sections

</div>

```
┌──────────────────────────────────────────────────────────┐
│  🎬  Splash Screen        → Cinematic brand entrance      │
│  🏠  Hero Section         → Video background + headline   │
│  📊  KPI Section          → Animated key metrics          │
│  👔  Leadership Messages  → CEO & Chairman messages       │
│  🏛️  Legacy Milestones    → Company history timeline      │
│  🧭  True North Section   → Vision & strategy             │
│  🌐  Guiding Compass      → Core values showcase          │
│  🌱  Sustainability       → ESG commitments               │
│  📖  About Legacy         → Our heritage story            │
│  🤖  CompassAI Chatbot    → AI-powered Q&A assistant      │
│  🔗  Footer               → Links & legal                 │
└──────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🛠️ Tech Stack

</div>

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 |
| **AI Integration** | OpenAI API via `openai` SDK |
| **Animations** | CSS transitions, custom hooks, scroll-driven effects |
| **Rendering** | React 18 with client-side interactivity |
| **Markdown** | `react-markdown` for AI chat responses |

---

<div align="center">

## 🚀 Getting Started

</div>

### Prerequisites

- Node.js `18+`
- An OpenAI API key (for the CompassAI chatbot)

### Installation

```bash
# Clone the repository
git clone https://github.com/heshanRkotuwegedara/ceylife-annual-report-2025.git
cd ceylife-annual-report-2025

# Install dependencies
npm install

# Set up your environment
cp .env.local.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and experience the report ✨

### Build for Production

```bash
npm run build
npm start
```

---

<div align="center">

## 📁 Project Structure

</div>

```
ceylife-annual-report-2025/
├── app/
│   ├── layout.tsx          # Root layout & metadata
│   ├── page.tsx            # Main page orchestration
│   └── globals.css         # Global styles
│
├── components/
│   ├── SplashScreen.tsx         # Cinematic intro screen
│   ├── Navbar.tsx               # Navigation bar
│   ├── HeroSection.tsx          # Video hero section
│   ├── KPISection.tsx           # Animated KPI metrics
│   ├── LeadershipMessagesSection.tsx
│   ├── LegacyMilestonesSection.tsx
│   ├── TrueNorthSection.tsx
│   ├── GuidingCompassSection.tsx
│   ├── SustainabilitySection.tsx
│   ├── AboutLegacySection.tsx
│   ├── CompassAIButton.tsx      # AI chatbot trigger
│   ├── ChatbotPopup.tsx         # AI chat interface
│   ├── StarCursor.tsx           # Custom star cursor
│   ├── MarqueeStrip.tsx         # Scrolling text strip
│   └── Footer.tsx
│
├── hooks/
│   └── useScrollAnimation.ts    # Scroll-driven animation hook
│
└── public/
    ├── images/                  # Brand imagery
    └── videos/                  # Hero video assets
```

---

<div align="center">

## 🤖 CompassAI — The AI Chatbot

</div>

The **CompassAI** chatbot is embedded into the report experience and powered by the **OpenAI API**. It allows readers to:

- 💬 Ask questions about Ceylife's 2025 performance
- 📈 Explore KPIs and financial highlights
- 🌱 Learn about sustainability initiatives
- 🧭 Understand Ceylife's vision and strategy

The chatbot is accessible via the floating **compass button** in the bottom-right corner of the screen.

---

<div align="center">

## 🎨 Design Philosophy

</div>

> _"Every pixel tells a story."_

The report was designed with a **dark, premium aesthetic** — deep navy backgrounds, gold (`#F5A623`) accents, and glassmorphism UI elements. Motion is used intentionally: entrance animations, scroll triggers, and micro-interactions all serve to **guide the reader's attention**, not distract it.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:f5a623,100:1a1a2e&height=120&section=footer&animation=fadeIn" width="100%"/>

**Made with ❤️ for Ceylife Insurance · 2025**

</div>
