# AI Chat Assistant

A modern, responsive chat interface powered by Groq's AI models. Built with Next.js and Tailwind CSS.

## Features

- 🤖 Multiple AI model support (Llama 3, Mixtral, Gemma)
- 📱 Fully responsive design
- 🎨 Modern dark theme UI
- ✨ Markdown support
- 🔄 Real-time streaming responses

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/MrBombastic-69/ai-chat-assistant.git
cd Chatbot-main
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Groq API key:
```
GROQ_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Prerequisites
- A Groq API key from [https://console.groq.com/](https://console.groq.com/)

### Steps:
1. **Push your code to GitHub** (already done!)
2. **Import your repository on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `MrBombastic-69/ai-chat-assistant`
3. **Add Environment Variables:**
   - In your Vercel project dashboard, go to **Settings** → **Environment Variables**
   - Add variable:
     - **Name:** `GROQ_API_KEY`
     - **Value:** Your Groq API key
     - **Environment:** Select all (Production, Preview, Development)
4. **Deploy:** Vercel will automatically deploy your project
5. **Test:** Visit your Vercel URL to test the chat functionality

### Environment Variables Required:
- `GROQ_API_KEY`: Your Groq API key (required for AI chat functionality)

## Technologies Used

- Next.js 14
- React
- Tailwind CSS
- Groq API
- React Markdown

## License

MIT
