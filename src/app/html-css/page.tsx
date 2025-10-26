'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronRight, 
  Palette, 
  Play, 
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Code,
  Layout,
  Smartphone,
  Monitor
} from 'lucide-react'

const topics = [
  {
    title: 'HTML Fundamentals',
    icon: Layout,
    color: 'from-orange-400 to-red-500',
    subtopics: [
      {
        title: 'Semantic HTML',
        content: `Semantic HTML uses elements that clearly describe their meaning in a human- and machine-readable way.

// Semantic elements
<header>     - Site or section header
<nav>        - Navigation links
<main>       - Main content of the page
<section>    - Thematic grouping of content
<article>    - Self-contained content
<aside>      - Sidebar content
<footer>     - Site or section footer

// Text semantics
<h1> to <h6> - Headings (h1 is most important)
<p>          - Paragraphs
<strong>     - Important text (bold)
<em>         - Emphasized text (italic)
<mark>       - Highlighted text
<small>      - Small print
<time>       - Date/time information

// Lists
<ul>         - Unordered list
<ol>         - Ordered list
<li>         - List item
<dl>         - Description list
<dt>         - Description term
<dd>         - Description definition`,
        example: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML Example</title>
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <header>
        <h2>Article Title</h2>
        <time datetime="2024-01-15">January 15, 2024</time>
      </header>
      
      <section>
        <h3>Introduction</h3>
        <p>This is the <strong>introduction</strong> to the article.</p>
      </section>
      
      <section>
        <h3>Main Content</h3>
        <p>The <em>main content</em> goes here with <mark>highlighted text</mark>.</p>
      </section>
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#">Related Article 1</a></li>
        <li><a href="#">Related Article 2</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`
      },
      {
        title: 'Forms and Input Elements',
        content: `HTML forms are used to collect user input and send it to a server.

// Form structure
<form action="/submit" method="POST">
  <!-- Form controls go here -->
</form>

// Input types
<input type="text">        - Single-line text input
<input type="email">       - Email input with validation
<input type="password">    - Password input (hidden)
<input type="number">      - Number input
<input type="date">        - Date picker
<input type="checkbox">    - Checkbox
<input type="radio">       - Radio button
<input type="file">        - File upload
<input type="submit">      - Submit button

// Other form elements
<textarea>                 - Multi-line text input
<select>                   - Dropdown list
<option>                   - Option in select
<label>                    - Label for form controls
<fieldset>                 - Group related form controls
<legend>                   - Caption for fieldset`,
        example: `<!DOCTYPE html>
<html>
<head>
  <title>Contact Form</title>
</head>
<body>
  <form action="/contact" method="POST" novalidate>
    <fieldset>
      <legend>Personal Information</legend>
      
      <div>
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone">
      </div>
    </fieldset>
    
    <fieldset>
      <legend>Preferences</legend>
      
      <div>
        <label for="newsletter">
          <input type="checkbox" id="newsletter" name="newsletter">
          Subscribe to newsletter
        </label>
      </div>
      
      <div>
        <label>Preferred Contact Method:</label>
        <div>
          <input type="radio" id="email-contact" name="contact" value="email" checked>
          <label for="email-contact">Email</label>
        </div>
        <div>
          <input type="radio" id="phone-contact" name="contact" value="phone">
          <label for="phone-contact">Phone</label>
        </div>
      </div>
      
      <div>
        <label for="country">Country:</label>
        <select id="country" name="country">
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>
    </fieldset>
    
    <div>
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="5" cols="50"></textarea>
    </div>
    
    <div>
      <button type="submit">Send Message</button>
      <button type="reset">Clear Form</button>
    </div>
  </form>
</body>
</html>`
      }
    ]
  },
  {
    title: 'CSS Layout',
    icon: Layout,
    color: 'from-blue-400 to-cyan-500',
    subtopics: [
      {
        title: 'Flexbox',
        content: `Flexbox is a one-dimensional layout method for arranging items in rows or columns.

// Container properties
display: flex;              - Makes element a flex container
flex-direction: row;        - Main axis direction (row, column, row-reverse, column-reverse)
flex-wrap: nowrap;          - Whether items wrap (nowrap, wrap, wrap-reverse)
justify-content: flex-start; - Main axis alignment
align-items: stretch;       - Cross axis alignment
align-content: stretch;     - Cross axis alignment for wrapped lines
gap: 10px;                  - Space between items

// Item properties
flex-grow: 0;               - How much item should grow
flex-shrink: 1;             - How much item should shrink
flex-basis: auto;           - Initial size before growing/shrinking
flex: 1;                    - Shorthand for grow, shrink, basis
align-self: auto;           - Override container's align-items`,
        example: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 200px;
      border: 2px solid #333;
      padding: 10px;
    }
    
    .item {
      background: #f0f0f0;
      padding: 20px;
      margin: 5px;
      text-align: center;
    }
    
    .item-1 { flex: 1; }
    .item-2 { flex: 2; }
    .item-3 { flex: 1; }
    
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      background: #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item item-1">Item 1</div>
    <div class="item item-2">Item 2 (flex: 2)</div>
    <div class="item item-3">Item 3</div>
  </div>
  
  <div class="center">
    <p>Centered content</p>
  </div>
</body>
</html>`
      },
      {
        title: 'CSS Grid',
        content: `CSS Grid is a two-dimensional layout system for creating complex layouts.

// Container properties
display: grid;              - Makes element a grid container
grid-template-columns: 1fr 2fr 1fr;  - Define column sizes
grid-template-rows: 100px 200px;     - Define row sizes
grid-template-areas: "header header" "sidebar main";  - Named grid areas
gap: 20px;                  - Space between grid items
justify-items: start;       - Horizontal alignment of items
align-items: start;         - Vertical alignment of items

// Item properties
grid-column: 1 / 3;         - Item spans from column 1 to 3
grid-row: 1 / 2;            - Item spans from row 1 to 2
grid-area: header;          - Place item in named area
justify-self: center;       - Override container's justify-items
align-self: center;         - Override container's align-items`,
        example: `<!DOCTYPE html>
<html>
<head>
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: 200px 1fr 200px;
      grid-template-rows: 80px 1fr 80px;
      grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
      gap: 10px;
      height: 100vh;
    }
    
    .header { 
      grid-area: header; 
      background: #333; 
      color: white; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
    }
    
    .sidebar { 
      grid-area: sidebar; 
      background: #f0f0f0; 
      padding: 20px; 
    }
    
    .main { 
      grid-area: main; 
      background: white; 
      padding: 20px; 
    }
    
    .aside { 
      grid-area: aside; 
      background: #f0f0f0; 
      padding: 20px; 
    }
    
    .footer { 
      grid-area: footer; 
      background: #333; 
      color: white; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
    }
  </style>
</head>
<body>
  <div class="grid-container">
    <header class="header">Header</header>
    <nav class="sidebar">Sidebar</nav>
    <main class="main">Main Content</main>
    <aside class="aside">Aside</aside>
    <footer class="footer">Footer</footer>
  </div>
</body>
</html>`
      }
    ]
  },
  {
    title: 'Responsive Design',
    icon: Smartphone,
    color: 'from-green-400 to-emerald-500',
    subtopics: [
      {
        title: 'Media Queries',
        content: `Media queries allow you to apply CSS styles based on device characteristics.

// Basic syntax
@media (condition) {
  /* CSS rules */
}

// Common breakpoints
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }

// Common conditions
max-width: 768px           - Maximum width
min-width: 769px           - Minimum width
orientation: portrait      - Portrait orientation
orientation: landscape     - Landscape orientation
screen and (max-width: 768px)  - Screen devices only
print                      - Print media

// Mobile-first approach
/* Base styles for mobile */
.container { width: 100%; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { width: 750px; margin: 0 auto; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { width: 1200px; }
}`,
        example: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    .container {
      width: 100%;
      padding: 20px;
    }
    
    .card {
      background: #f0f0f0;
      padding: 20px;
      margin: 10px 0;
      border-radius: 8px;
    }
    
    /* Mobile first - single column */
    .grid {
      display: block;
    }
    
    /* Tablet - two columns */
    @media (min-width: 768px) {
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }
    }
    
    /* Desktop - three columns */
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
    
    /* Large desktop - four columns */
    @media (min-width: 1200px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Responsive Grid</h1>
    <div class="grid">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
      <div class="card">Card 4</div>
    </div>
  </div>
</body>
</html>`
      },
      {
        title: 'Flexible Units',
        content: `Use flexible units to create responsive layouts that adapt to different screen sizes.

// Relative units
em          - Relative to font-size of element
rem         - Relative to font-size of root element
%           - Percentage of parent element
vw          - 1% of viewport width
vh          - 1% of viewport height
vmin        - 1% of viewport's smaller dimension
vmax        - 1% of viewport's larger dimension

// Flexible layouts
width: 100%;              - Full width of parent
max-width: 1200px;        - Maximum width constraint
min-width: 320px;         - Minimum width constraint
width: calc(100% - 40px); - Calculated width

// Responsive typography
font-size: 1rem;          - Base font size
font-size: clamp(1rem, 2.5vw, 2rem);  - Fluid typography
line-height: 1.5;         - Relative line height`,
        example: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .hero {
      height: 50vh;  /* 50% of viewport height */
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }
    
    .hero h1 {
      font-size: clamp(2rem, 5vw, 4rem);  /* Fluid typography */
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: clamp(1rem, 2.5vw, 1.5rem);
      max-width: 600px;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
    }
    
    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .card p {
      line-height: 1.6;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <div>
        <h1>Responsive Design</h1>
        <p>This layout adapts to different screen sizes using flexible units and media queries.</p>
      </div>
    </section>
    
    <section class="grid">
      <div class="card">
        <h3>Flexible Units</h3>
        <p>Using vw, vh, %, and calc() for responsive layouts.</p>
      </div>
      <div class="card">
        <h3>Media Queries</h3>
        <p>Different styles for different screen sizes.</p>
      </div>
      <div class="card">
        <h3>Grid Layout</h3>
        <p>CSS Grid with auto-fit for responsive columns.</p>
      </div>
    </section>
  </div>
</body>
</html>`
      }
    ]
  },
  {
    title: 'CSS Animations',
    icon: Play,
    color: 'from-purple-400 to-pink-500',
    subtopics: [
      {
        title: 'Transitions',
        content: `CSS transitions provide a way to control animation speed when changing CSS properties.

// Basic transition
transition: property duration timing-function delay;

// Individual properties
transition-property: all;           - Properties to animate
transition-duration: 0.3s;         - Duration of transition
transition-timing-function: ease;  - Timing function
transition-delay: 0s;              - Delay before transition starts

// Timing functions
ease                - Slow start, fast middle, slow end
ease-in             - Slow start
ease-out            - Slow end
ease-in-out         - Slow start and end
linear              - Constant speed
cubic-bezier()      - Custom timing function

// Shorthand
transition: all 0.3s ease;         - All properties, 0.3s, ease timing
transition: opacity 0.5s ease-in-out 0.2s;  - Opacity, 0.5s, ease-in-out, 0.2s delay`,
        example: `<!DOCTYPE html>
<html>
<head>
  <style>
    .button {
      background: #007bff;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      
      /* Transition properties */
      transition: all 0.3s ease;
    }
    
    .button:hover {
      background: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin: 20px;
      width: 200px;
      
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    
    .fade-in {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    
    .fade-in.visible {
      opacity: 1;
    }
  </style>
</head>
<body>
  <button class="button">Hover me</button>
  
  <div class="card">
    <h3>Card Title</h3>
    <p>Hover to see the effect</p>
  </div>
  
  <div class="fade-in visible">
    <p>This text fades in when the class is added</p>
  </div>
</body>
</html>`
      },
      {
        title: 'Keyframe Animations',
        content: `Keyframe animations allow you to create complex animations with multiple steps.

// Define keyframes
@keyframes animation-name {
  0% { /* styles */ }
  50% { /* styles */ }
  100% { /* styles */ }
}

// Apply animation
animation: name duration timing-function delay iteration-count direction fill-mode;

// Individual properties
animation-name: slideIn;           - Name of keyframe animation
animation-duration: 1s;           - Duration of animation
animation-timing-function: ease;  - Timing function
animation-delay: 0s;              - Delay before animation starts
animation-iteration-count: 1;     - Number of times to repeat (infinite)
animation-direction: normal;      - Direction (normal, reverse, alternate, alternate-reverse)
animation-fill-mode: none;        - How to apply styles before/after animation
animation-play-state: running;    - Whether animation is running or paused`,
        example: `<!DOCTYPE html>
<html>
<head>
  <style>
    @keyframes slideIn {
      0% {
        transform: translateX(-100%);
        opacity: 0;
      }
      50% {
        transform: translateX(0);
        opacity: 0.5;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-15px);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    
    .slide-in {
      animation: slideIn 1s ease-out;
    }
    
    .bounce {
      animation: bounce 2s infinite;
    }
    
    .pulse {
      animation: pulse 1s ease-in-out infinite;
    }
    
    .box {
      width: 100px;
      height: 100px;
      background: #007bff;
      margin: 20px;
      display: inline-block;
    }
    
    .container {
      text-align: center;
      padding: 50px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box slide-in"></div>
    <div class="box bounce"></div>
    <div class="box pulse"></div>
  </div>
</body>
</html>`
      }
    ]
  }
]

const interviewQuestions = [
  {
    question: "What is the difference between margin and padding?",
    answer: `Margin:
- Space outside the element's border
- Creates space between elements
- Can have negative values
- Collapses with adjacent margins
- Not affected by background color

Padding:
- Space inside the element's border
- Space between content and border
- Cannot have negative values
- Does not collapse
- Affected by background color

// Example:
.box {
  width: 200px;
  height: 100px;
  background: blue;
  margin: 20px;    /* Space outside the box */
  padding: 10px;   /* Space inside the box */
  border: 2px solid red;
}

// Box model from outside to inside:
// margin -> border -> padding -> content`,
    difficulty: 'Easy',
    category: 'Box Model'
  },
  {
    question: "Explain the CSS Box Model",
    answer: `The CSS Box Model describes how elements are rendered on the page.

Components (from outside to inside):
1. Margin - Space outside the element
2. Border - Border around the element
3. Padding - Space inside the element, outside content
4. Content - The actual content (text, images, etc.)

// Box-sizing property
box-sizing: content-box;  // Default - width/height applies to content only
box-sizing: border-box;   // Width/height includes padding and border

// Example:
.element {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box;  // Total width = 200px (includes padding + border)
}

// Without border-box, total width would be:
// 200px (content) + 40px (padding) + 10px (border) = 250px`,
    difficulty: 'Easy',
    category: 'Box Model'
  },
  {
    question: "What is the difference between display: block, inline, and inline-block?",
    answer: `display: block:
- Takes full width of parent
- Starts on new line
- Can have width, height, margin, padding
- Examples: div, p, h1-h6, section, article

display: inline:
- Takes only as much width as needed
- Stays on same line
- Cannot set width, height, top/bottom margins
- Examples: span, a, strong, em

display: inline-block:
- Combines features of both
- Takes only as much width as needed
- Stays on same line
- Can set width, height, margin, padding
- Useful for creating horizontal layouts

// Example:
.block { display: block; width: 200px; height: 100px; background: red; }
.inline { display: inline; width: 200px; height: 100px; background: blue; }
.inline-block { display: inline-block; width: 200px; height: 100px; background: green; }`,
    difficulty: 'Easy',
    category: 'Display Properties'
  },
  {
    question: "How do you center an element horizontally and vertically?",
    answer: `Multiple ways to center elements:

1. Flexbox (modern approach):
.center {
  display: flex;
  justify-content: center;  /* Horizontal */
  align-items: center;      /* Vertical */
  height: 100vh;
}

2. CSS Grid:
.center {
  display: grid;
  place-items: center;
  height: 100vh;
}

3. Absolute positioning:
.parent {
  position: relative;
  height: 100vh;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

4. Text alignment (for inline/inline-block):
.parent {
  text-align: center;
  line-height: 100vh;  /* Same as height for vertical centering */
}

.child {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}`,
    difficulty: 'Medium',
    category: 'Layout'
  }
]

export default function HTMLCSSPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null)
  const [expandedSubtopic, setExpandedSubtopic] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState<number | null>(null)

  return (
    <div className="min-h-screen py-8 px-4 lg:pl-96">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6">
            HTML & CSS Fundamentals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master HTML semantics, CSS layout, responsive design, and modern styling techniques
          </p>
        </motion.div>

        {/* Topics Section */}
        <div className="space-y-6 mb-16">
          {topics.map((topic, topicIndex) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: topicIndex * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedTopic(expandedTopic === topicIndex ? null : topicIndex)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${topic.color} flex items-center justify-center`}>
                    <topic.icon className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {topic.title}
                  </h2>
                </div>
                {expandedTopic === topicIndex ? (
                  <ChevronDown className="text-gray-500" size={24} />
                ) : (
                  <ChevronRight className="text-gray-500" size={24} />
                )}
              </button>

              <AnimatePresence>
                {expandedTopic === topicIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6 space-y-4">
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <div key={subtopic.title} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                          <button
                            onClick={() => setExpandedSubtopic(expandedSubtopic === subtopicIndex ? null : subtopicIndex)}
                            className="w-full flex items-center justify-between mb-4"
                          >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {subtopic.title}
                            </h3>
                            {expandedSubtopic === subtopicIndex ? (
                              <ChevronDown className="text-gray-500" size={20} />
                            ) : (
                              <ChevronRight className="text-gray-500" size={20} />
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedSubtopic === subtopicIndex && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                              >
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                    <Layout className="mr-2" size={16} />
                                    Concept
                                  </h4>
                                  <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                    {subtopic.content}
                                  </pre>
                                </div>
                                
                                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center">
                                    <Code className="mr-2" size={16} />
                                    Example
                                  </h4>
                                  <pre className="text-sm text-orange-600 dark:text-orange-400 whitespace-pre-wrap">
                                    {subtopic.example}
                                  </pre>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Interview Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            HTML/CSS Interview Questions
          </h2>
          
          <div className="space-y-6">
            {interviewQuestions.map((qa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {qa.question}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        qa.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : qa.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {qa.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {qa.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAnswer(showAnswer === index ? null : index)}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    {showAnswer === index ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Hide Answer</span>
                      </>
                    ) : (
                      <>
                        <Lightbulb size={16} />
                        <span>Show Answer</span>
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {showAnswer === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
                    >
                      <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {qa.answer}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
