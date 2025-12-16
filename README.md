# SkillSwap 🤝

**SkillSwap** is a revolutionary peer-to-peer skill exchange platform where **time is the currency**. Teach what you know, earn time credits, and use them to learn what you need from others. No money involved—just pure knowledge exchange.

![SkillSwap Banner](/public/logo.png)

## 🚀 Features

### 🎓 Learning & Teaching
- **Shadow Mode**: Join "stealth" sessions to observe experts working in real-time without interrupting flow.
- **P2P Video Calling**: Integrated WebRTC video sessions for face-to-face mentoring.
- **Canvas Whiteboard**: Interactive collaborative whiteboard for explaining concepts.
- **AI Notes**: Real-time AI-powered session summarization (Mock/Prototype).

### 🎮 Gamification & Growth
- **Time Banking**: Earn coins for every minute you teach.
- **Career GPS**: AI-generated learning roadmaps tailored to your goals.
- **Skill Verification**: Blockchain-style verification for skills you demonstrate.
- **Badges & Levels**: Progress from Novice to Expert with visual rewards.

### 🛠 Tech Stack

- **Frontend Builder**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Vanilla CSS (Glassmorphism)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Auth**: [Supabase](https://supabase.com/) (Postgres, Auth, Realtime)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (Planned/Partial)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A [Supabase](https://supabase.com/) account

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/skill-swap.git
    cd skill-swap
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_GEMINI_API_KEY=your_google_gemini_key
    ```

4.  **Database Setup**
    Run the SQL commands found in `supabase_schema.sql` in your Supabase Dashboard's SQL Editor to set up the `profiles` table and triggers.

5.  **Run the application**
    ```bash
    npm run dev
    ```
    Open `http://localhost:8080` in your browser.

## 📂 Project Structure

```
skill-swap/
├── public/              # Static assets (logo, favicon)
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # Global state (Auth, User)
│   ├── integrations/    # Supabase & External Services
│   ├── pages/           # Application Routes (Login, Dashboard, Session)
│   ├── services/        # Logic services (Signaling, AI)
│   └── App.tsx          # Main Entry
├── supabase/            # Migrations and SQL types
└── vite.config.ts       # Vite Configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
