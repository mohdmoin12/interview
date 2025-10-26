'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  CheckCircle,
  Lightbulb,
  Code,
  Star,
  Clock,
  Users,
  BookOpen,
  Zap,
  Palette,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const allQuestions = [
  // JavaScript Questions
  {
    id: 1,
    question: "What is the difference between 'let', 'const', and 'var'?",
    answer: `var: Function-scoped, can be redeclared, hoisted with undefined value
let: Block-scoped, cannot be redeclared, hoisted but not initialized (temporal dead zone)
const: Block-scoped, cannot be redeclared or reassigned, must be initialized

// Example:
function example() {
  console.log(x); // undefined (var is hoisted)
  console.log(y); // ReferenceError (let is in temporal dead zone)
  
  var x = 1;
  let y = 2;
  const z = 3;
  
  if (true) {
    var x = 10; // Same variable, overwrites
    let y = 20; // Different variable, block-scoped
    const z = 30; // Different variable, block-scoped
  }
  
  console.log(x); // 10
  console.log(y); // 2
  console.log(z); // 3
}`,
    difficulty: 'Easy',
    category: 'JavaScript',
    tags: ['Variables', 'Scope', 'Hoisting'],
    timeToAnswer: '2-3 minutes',
    frequency: 'Very High'
  },
  {
    id: 2,
    question: "Explain closures in JavaScript",
    answer: `A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function returns.

// Basic closure example
function outerFunction(x) {
  // Outer function's variable
  const outerVariable = x;
  
  // Inner function (closure)
  function innerFunction(y) {
    return outerVariable + y;
  }
  
  return innerFunction;
}

const closure = outerFunction(10);
console.log(closure(5)); // 15

// Practical example - Counter
function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => count = initialValue
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getValue());  // 11`,
    difficulty: 'Medium',
    category: 'JavaScript',
    tags: ['Closures', 'Scope', 'Functions'],
    timeToAnswer: '5-7 minutes',
    frequency: 'High'
  },
  {
    id: 3,
    question: "What is the difference between '==' and '==='?",
    answer: `== (loose equality):
- Performs type coercion before comparison
- Converts operands to same type before comparing
- Can lead to unexpected results

=== (strict equality):
- No type coercion
- Compares both value and type
- More predictable and recommended

// Examples:
console.log(5 == "5");   // true (type coercion)
console.log(5 === "5");  // false (different types)

console.log(0 == false); // true (type coercion)
console.log(0 === false); // false (different types)

console.log(null == undefined); // true (special case)
console.log(null === undefined); // false (different types)

// Best practice: Always use === unless you specifically need type coercion`,
    difficulty: 'Easy',
    category: 'JavaScript',
    tags: ['Operators', 'Type Coercion', 'Comparison'],
    timeToAnswer: '1-2 minutes',
    frequency: 'Very High'
  },
  {
    id: 4,
    question: "Explain the 'this' keyword in JavaScript",
    answer: `'this' refers to the object that is currently executing the function. Its value depends on how the function is called:

1. Global context: 'this' refers to the global object (window in browser)
2. Object method: 'this' refers to the object
3. Constructor: 'this' refers to the new instance
4. Arrow functions: 'this' is lexically bound

// Examples:
const obj = {
  name: 'John',
  greet: function() {
    console.log(this.name); // 'John' (this refers to obj)
  },
  greetArrow: () => {
    console.log(this.name); // undefined (lexical this)
  }
};

obj.greet(); // 'John'
obj.greetArrow(); // undefined

// Call, apply, bind
function sayHello() {
  console.log(\`Hello, \${this.name}\`);
}

const person = { name: 'Alice' };
sayHello.call(person); // Hello, Alice
sayHello.apply(person); // Hello, Alice
const boundHello = sayHello.bind(person);
boundHello(); // Hello, Alice`,
    difficulty: 'Medium',
    category: 'JavaScript',
    tags: ['this', 'Context', 'Functions'],
    timeToAnswer: '5-8 minutes',
    frequency: 'High'
  },
  {
    id: 5,
    question: "What are Promises and how do they work?",
    answer: `Promises represent the eventual completion or failure of an asynchronous operation.

// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('Success!');
    } else {
      reject(new Error('Something went wrong'));
    }
  }, 1000);
});

// Using promises
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Promise completed'));

// Promise.all - wait for all promises
Promise.all([promise1, promise2, promise3])
  .then(results => console.log('All completed:', results))
  .catch(error => console.error('One failed:', error));

// Promise.race - first to complete
Promise.race([promise1, promise2])
  .then(result => console.log('First completed:', result));`,
    difficulty: 'Medium',
    category: 'JavaScript',
    tags: ['Promises', 'Async', 'Error Handling'],
    timeToAnswer: '5-10 minutes',
    frequency: 'High'
  },

  // React Questions
  {
    id: 6,
    question: "What is the difference between state and props?",
    answer: `Props (Properties):
- Passed down from parent components
- Read-only (immutable)
- Used for communication between components
- Cannot be modified by the component receiving them

State:
- Managed within the component
- Mutable (can be changed using setState)
- Used for component's internal data
- Triggers re-render when changed

// Example:
function Parent() {
  const [count, setCount] = useState(0); // State
  
  return <Child count={count} onIncrement={() => setCount(count + 1)} />;
}

function Child({ count, onIncrement }) { // Props
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}`,
    difficulty: 'Easy',
    category: 'React',
    tags: ['State', 'Props', 'Components'],
    timeToAnswer: '3-5 minutes',
    frequency: 'Very High'
  },
  {
    id: 7,
    question: "Explain the Virtual DOM and how it works",
    answer: `Virtual DOM is a JavaScript representation of the real DOM.

How it works:
1. When state changes, React creates a new Virtual DOM tree
2. React compares (diffing) the new Virtual DOM with the previous one
3. React calculates the minimal set of changes needed
4. React updates only the changed parts of the real DOM

Benefits:
- Faster updates (batch DOM operations)
- Better performance (minimal DOM manipulation)
- Cross-browser compatibility
- Declarative programming model

// Example of how React optimizes updates:
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// If only one todo changes, React only updates that specific <li> element`,
    difficulty: 'Medium',
    category: 'React',
    tags: ['Virtual DOM', 'Performance', 'Rendering'],
    timeToAnswer: '5-8 minutes',
    frequency: 'High'
  },
  {
    id: 8,
    question: "What are React Hooks and why were they introduced?",
    answer: `React Hooks are functions that let you use state and other React features in functional components.

Why introduced:
- Reuse stateful logic between components
- Simplify complex components
- Avoid wrapper hell (HOCs, render props)
- Make React more functional

// useState Hook
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// useEffect Hook
function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, [url]);
  
  return <div>{data ? data.title : 'Loading...'}</div>;
}

// Custom Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}`,
    difficulty: 'Medium',
    category: 'React',
    tags: ['Hooks', 'Functional Components', 'State Management'],
    timeToAnswer: '7-10 minutes',
    frequency: 'Very High'
  },
  {
    id: 9,
    question: "What is the difference between controlled and uncontrolled components?",
    answer: `Controlled Components:
- Form data is handled by React state
- Input value is controlled by React
- Single source of truth
- More predictable and easier to debug

Uncontrolled Components:
- Form data is handled by the DOM
- Input value is managed by the DOM
- Use refs to access values
- Less code, but less control

// Controlled Component
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled Component
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    difficulty: 'Medium',
    category: 'React',
    tags: ['Forms', 'State', 'Refs'],
    timeToAnswer: '5-8 minutes',
    frequency: 'High'
  },

  // Next.js Questions
  {
    id: 10,
    question: "What is the difference between getServerSideProps and getStaticProps?",
    answer: `getServerSideProps:
- Runs on the server on every request
- Data is fetched at request time
- Always up-to-date data
- Slower response time
- Good for dynamic, user-specific content
- Can access request/response objects

getStaticProps:
- Runs at build time
- Data is fetched once and cached
- Faster response time
- Good for static content that doesn't change often
- Can use revalidate for ISR (Incremental Static Regeneration)
- Cannot access request/response objects

// getServerSideProps example
export async function getServerSideProps(context) {
  const data = await fetchData(context.params.id);
  return { props: { data } };
}

// getStaticProps example
export async function getStaticProps() {
  const data = await fetchData();
  return { 
    props: { data },
    revalidate: 60 // Revalidate every 60 seconds
  };
}`,
    difficulty: 'Medium',
    category: 'Next.js',
    tags: ['SSR', 'SSG', 'Data Fetching'],
    timeToAnswer: '5-8 minutes',
    frequency: 'High'
  },
  {
    id: 11,
    question: "How do you handle authentication in Next.js?",
    answer: `There are several ways to handle authentication in Next.js:

1. Using middleware for route protection
2. Using getServerSideProps to check auth
3. Using third-party libraries like NextAuth.js

// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// pages/dashboard.js
export async function getServerSideProps(context) {
  const token = context.req.cookies['auth-token'];
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  
  const user = await verifyToken(token);
  
  return {
    props: { user }
  };
}

// Using NextAuth.js
import { useSession } from 'next-auth/react'

function Dashboard() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <p>Access Denied</p>;
  
  return <p>Welcome {session.user.name}</p>;
}`,
    difficulty: 'Medium',
    category: 'Next.js',
    tags: ['Authentication', 'Middleware', 'Security'],
    timeToAnswer: '8-12 minutes',
    frequency: 'High'
  },

  // HTML/CSS Questions
  {
    id: 12,
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
    category: 'HTML/CSS',
    tags: ['Box Model', 'Layout', 'Spacing'],
    timeToAnswer: '2-3 minutes',
    frequency: 'Very High'
  },
  {
    id: 13,
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
    category: 'HTML/CSS',
    tags: ['Layout', 'Flexbox', 'Grid', 'Positioning'],
    timeToAnswer: '5-8 minutes',
    frequency: 'High'
  },
  {
    id: 14,
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
    category: 'HTML/CSS',
    tags: ['Display', 'Layout', 'Box Model'],
    timeToAnswer: '3-5 minutes',
    frequency: 'High'
  }
]

const categories = ['All', 'JavaScript', 'React', 'Next.js', 'HTML/CSS']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']
const timeRanges = ['All', '1-3 minutes', '3-5 minutes', '5-8 minutes', '8+ minutes']

export default function InterviewPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedTime, setSelectedTime] = useState('All')
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || question.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty
      const matchesTime = selectedTime === 'All' || question.timeToAnswer === selectedTime
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesTime
    })
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedTime])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'JavaScript': return Code
      case 'React': return Zap
      case 'Next.js': return FileText
      case 'HTML/CSS': return Palette
      default: return BookOpen
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Interview Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice with comprehensive frontend interview questions covering JavaScript, React, Next.js, and HTML/CSS
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search questions, answers, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filters</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </div>

                  {/* Time Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time to Answer
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {timeRanges.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredQuestions.length} of {allQuestions.length} questions
          </p>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => {
            const CategoryIcon = getCategoryIcon(question.category)
            
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <CategoryIcon className="text-blue-500" size={24} />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {question.question}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {question.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 flex items-center">
                          <Clock className="mr-1" size={12} />
                          {question.timeToAnswer}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 flex items-center">
                          <Star className="mr-1" size={12} />
                          {question.frequency}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {question.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                    >
                      {expandedQuestion === question.id ? (
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
                    {expandedQuestion === question.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                          <Code className="mr-2" size={16} />
                          Answer
                        </h4>
                        <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                          {question.answer}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No questions found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
