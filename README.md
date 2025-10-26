# Frontend Mastery - Complete Tutorial & Interview Prep

A comprehensive frontend development learning platform built with Next.js, featuring interactive tutorials, code examples, and interview preparation for JavaScript, React, Next.js, and HTML/CSS.

## 🚀 Features

### 📚 Comprehensive Learning Content
- **JavaScript Fundamentals**: ES6+ features, async programming, closures, and modern concepts
- **React Development**: Hooks, component lifecycle, state management, and best practices
- **Next.js Framework**: File-based routing, SSR, API routes, and performance optimization
- **HTML/CSS**: Semantic markup, responsive design, CSS Grid, Flexbox, and animations

### 🎯 Interview Preparation
- **200+ Interview Questions** covering all frontend topics
- **Advanced Search & Filtering** by category, difficulty, and time to answer
- **Detailed Answers** with code examples and explanations
- **Difficulty Levels**: Easy, Medium, and Hard questions
- **Time Estimates** for each question

### 🎨 Modern UI/UX
- **Responsive Design** that works on all devices
- **Dark/Light Theme** toggle with system preference detection
- **Smooth Animations** using Framer Motion
- **Interactive Examples** with live code demonstrations
- **Beautiful Gradients** and modern design patterns

### ⚡ Performance & Accessibility
- **Server-Side Rendering** with Next.js
- **Optimized Images** and code splitting
- **SEO Friendly** with proper meta tags
- **Accessible** with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend-tutorial/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── javascript/         # JavaScript tutorial
│   │   ├── react/              # React tutorial
│   │   ├── nextjs/             # Next.js tutorial
│   │   ├── html-css/           # HTML/CSS tutorial
│   │   └── interview/          # Interview questions
│   └── components/             # Reusable components
│       ├── Navigation.tsx      # Main navigation
│       └── ThemeProvider.tsx   # Theme context
├── public/                     # Static assets
└── package.json
```

## 🎓 Learning Path

### 1. **JavaScript Fundamentals**
- ES6+ features (arrow functions, destructuring, template literals)
- Async programming (Promises, async/await)
- Closures and scope
- Interview questions and answers

### 2. **React Development**
- Hooks (useState, useEffect, useContext)
- Component lifecycle
- State management patterns
- Interactive examples

### 3. **Next.js Framework**
- File-based routing
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes and middleware

### 4. **HTML/CSS**
- Semantic HTML
- CSS Grid and Flexbox
- Responsive design
- CSS animations and transitions

### 5. **Interview Preparation**
- Search and filter questions
- Practice with different difficulty levels
- Detailed explanations and code examples

## 🎨 Customization

### Adding New Questions
1. Open `src/app/interview/page.tsx`
2. Add new questions to the `allQuestions` array
3. Include proper metadata (difficulty, category, tags, etc.)

### Adding New Tutorial Content
1. Create a new page in the `src/app/` directory
2. Follow the existing structure with topics and subtopics
3. Add navigation links in `src/components/Navigation.tsx`

### Styling
- Modify `src/app/globals.css` for global styles
- Use Tailwind CSS classes for component styling
- Customize theme colors in the Tailwind config

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **AWS Amplify**: Build command: `npm run build`
- **Railway**: Automatic deployment from GitHub

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Happy Learning! 🎉**

Built with ❤️ for the frontend development community.