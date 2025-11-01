"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  ChevronUp,
  HelpCircle,
} from "lucide-react";

const subjects = [
  {
    title: "JavaScript",
    href: "/javascript",
    icon: Code,
  },
  {
    title: "React",
    href: "/react",
    icon: Zap,
  },
  {
    title: "Next.js",
    href: "/nextjs",
    icon: FileText,
  },
  {
    title: "HTML & CSS",
    href: "/html-css",
    icon: Palette,
  },
  {
    title: "Interview Prep",
    href: "/interview",
    icon: HelpCircle,
  },
];

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
    difficulty: "Easy",
    category: "JavaScript",
    tags: ["Variables", "Scope", "Hoisting"],
    timeToAnswer: "2-3 minutes",
    frequency: "Very High",
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
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["Closures", "Scope", "Functions"],
    timeToAnswer: "5-7 minutes",
    frequency: "High",
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
    difficulty: "Easy",
    category: "JavaScript",
    tags: ["Operators", "Type Coercion", "Comparison"],
    timeToAnswer: "1-2 minutes",
    frequency: "Very High",
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
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["this", "Context", "Functions"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
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
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["Promises", "Async", "Error Handling"],
    timeToAnswer: "5-10 minutes",
    frequency: "High",
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
    difficulty: "Easy",
    category: "React",
    tags: ["State", "Props", "Components"],
    timeToAnswer: "3-5 minutes",
    frequency: "Very High",
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
    difficulty: "Medium",
    category: "React",
    tags: ["Virtual DOM", "Performance", "Rendering"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
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
    difficulty: "Medium",
    category: "React",
    tags: ["Hooks", "Functional Components", "State Management"],
    timeToAnswer: "7-10 minutes",
    frequency: "Very High",
  },
  {
    id: 9,
    question:
      "What is the difference between controlled and uncontrolled components?",
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
    difficulty: "Medium",
    category: "React",
    tags: ["Forms", "State", "Refs"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
  },

  // Next.js Questions
  {
    id: 10,
    question:
      "What is the difference between getServerSideProps and getStaticProps?",
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
    difficulty: "Medium",
    category: "Next.js",
    tags: ["SSR", "SSG", "Data Fetching"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
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
    difficulty: "Medium",
    category: "Next.js",
    tags: ["Authentication", "Middleware", "Security"],
    timeToAnswer: "8-12 minutes",
    frequency: "High",
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
    difficulty: "Easy",
    category: "HTML/CSS",
    tags: ["Box Model", "Layout", "Spacing"],
    timeToAnswer: "2-3 minutes",
    frequency: "Very High",
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
    difficulty: "Medium",
    category: "HTML/CSS",
    tags: ["Layout", "Flexbox", "Grid", "Positioning"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
  },
  {
    id: 14,
    question:
      "What is the difference between display: block, inline, and inline-block?",
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
    difficulty: "Easy",
    category: "HTML/CSS",
    tags: ["Display", "Layout", "Box Model"],
    timeToAnswer: "3-5 minutes",
    frequency: "High",
  },

  // More JavaScript Questions
  {
    id: 15,
    question: "What is the Event Loop in JavaScript?",
    answer: `The Event Loop is JavaScript's mechanism for handling asynchronous operations. It allows JavaScript to perform non-blocking operations.

How it works:
1. JavaScript has a Call Stack (synchronous code execution)
2. Web APIs handle async operations (setTimeout, fetch, DOM events)
3. Callback Queue holds completed async operations
4. Event Loop checks if Call Stack is empty, then moves callbacks to stack

// Example:
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Output: 1, 4, 3, 2
// Why: Call Stack executes 1 and 4 first
// Promises (microtasks) execute before setTimeout (macrotasks)
// Event Loop processes microtasks before macrotasks

// Microtasks: Promises, queueMicrotask
// Macrotasks: setTimeout, setInterval, I/O operations`,
    difficulty: "Hard",
    category: "JavaScript",
    tags: ["Event Loop", "Async", "Concurrency"],
    timeToAnswer: "10-15 minutes",
    frequency: "Very High",
  },
  {
    id: 16,
    question: "Explain async/await and how it differs from Promises",
    answer: `async/await is syntactic sugar over Promises, making asynchronous code look synchronous.

// Promise syntax
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

// async/await syntax
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

Benefits:
- Cleaner, more readable code
- Easier error handling with try/catch
- Sequential code flow
- Better debugging experience

// Parallel execution
const [user, posts] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);`,
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["Async/Await", "Promises", "ES6+"],
    timeToAnswer: "5-8 minutes",
    frequency: "Very High",
  },
  {
    id: 17,
    question: "What are JavaScript Arrow Functions and their limitations?",
    answer: `Arrow functions are a shorter syntax for writing functions with lexical 'this' binding.

// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => a + b;

// Single parameter
const square = x => x * x;

// No parameters
const greet = () => console.log('Hello');

// With body
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

Key Features:
- Lexical 'this' binding (inherits from parent scope)
- Cannot be used as constructors
- No 'arguments' object
- Implicit return for single expressions

Limitations:
- Cannot be used as methods (loses 'this')
- Cannot be used as constructors
- No 'arguments' object
- Cannot use 'super' or 'new.target'`,
    difficulty: "Easy",
    category: "JavaScript",
    tags: ["Arrow Functions", "ES6+", "Functions"],
    timeToAnswer: "3-5 minutes",
    frequency: "High",
  },
  {
    id: 18,
    question: "What is a Callback and Callback Hell?",
    answer: `A callback is a function passed as an argument to another function, executed after an operation completes.

// Simple callback
function greet(name, callback) {
  console.log('Hello', name);
  callback();
}

greet('John', () => console.log('Callback executed'));

Callback Hell occurs when callbacks are nested deeply, making code hard to read and maintain.

// Callback Hell Example
getUser(userId, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      getReplies(comments[0].id, (replies) => {
        // Nested callbacks - hard to read!
        console.log(replies);
      });
    });
  });
});

Solutions:
1. Promises
2. async/await
3. Named functions instead of anonymous

// With Promises
getUser(userId)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => getReplies(comments[0].id))
  .then(replies => console.log(replies));`,
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["Callbacks", "Async", "Code Quality"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
  },
  {
    id: 19,
    question: "Explain JavaScript Prototypes and Prototypal Inheritance",
    answer: `Every JavaScript object has a prototype property. Prototypes allow objects to inherit properties and methods from other objects.

// Prototype chain
const person = {
  name: 'John',
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

const student = Object.create(person);
student.name = 'Alice';
student.study = function() {
  return 'Studying...';
};

console.log(student.greet()); // Inherited from person
console.log(student.study()); // Own method

// Constructor functions
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

const john = new Person('John');
console.log(john.greet());

// ES6 Classes (syntactic sugar for prototypes)
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}

// Prototype chain lookup
// When accessing a property, JavaScript looks:
// 1. On the object itself
// 2. On the object's prototype
// 3. On the prototype's prototype
// Until it reaches Object.prototype`,
    difficulty: "Hard",
    category: "JavaScript",
    tags: ["Prototypes", "Inheritance", "OOP"],
    timeToAnswer: "10-12 minutes",
    frequency: "High",
  },
  {
    id: 20,
    question: "What is Debouncing and Throttling?",
    answer: `Debouncing and Throttling are techniques to limit function execution frequency.

Debouncing: Delays function execution until after a specified time has passed since the last invocation.

// Debounce implementation
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Use case: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  // API call only after user stops typing
  fetchSearchResults(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

Throttling: Limits function execution to at most once per specified time period.

// Throttle implementation
function throttle(func, limit) {
  let lastRun;
  return function(...args) {
    if (!lastRun || Date.now() - lastRun >= limit) {
      func.apply(this, args);
      lastRun = Date.now();
    }
  };
}

// Use case: Scroll events
const throttledScroll = throttle(() => {
  // Update scroll position only every 100ms
  updateScrollIndicator();
}, 100);

window.addEventListener('scroll', throttledScroll);`,
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["Performance", "Optimization", "Event Handling"],
    timeToAnswer: "8-10 minutes",
    frequency: "High",
  },

  // More React Questions
  {
    id: 21,
    question: "How do you optimize React performance?",
    answer: `Several strategies to optimize React performance:

1. useMemo - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

2. useCallback - Memoize functions
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

3. React.memo - Prevent unnecessary re-renders
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>;
});

4. Code splitting with lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

5. Virtualize long lists (react-window, react-virtuoso)
6. Avoid inline object/function creation in render
7. Use keys properly in lists
8. Split large components into smaller ones`,
    difficulty: "Medium",
    category: "React",
    tags: ["Performance", "Optimization", "Memoization"],
    timeToAnswer: "10-15 minutes",
    frequency: "Very High",
  },
  {
    id: 22,
    question: "What is useMemo and useCallback? When to use them?",
    answer: `useMemo: Memoizes the result of a computation, recalculates only when dependencies change.

// Without useMemo (recalculates every render)
function ExpensiveComponent({ items }) {
  const sorted = items.sort((a, b) => a.price - b.price); // Expensive!
  return <div>{sorted.map(...)}</div>;
}

// With useMemo (recalculates only when items change)
function ExpensiveComponent({ items }) {
  const sorted = useMemo(() => {
    return items.sort((a, b) => a.price - b.price);
  }, [items]);
  return <div>{sorted.map(...)}</div>;
}

useCallback: Memoizes a function, returns same function reference if dependencies haven't changed.

// Without useCallback (new function every render)
function Parent({ items }) {
  const handleClick = (id) => {
    // handle click
  };
  return <Child onClick={handleClick} />; // Child re-renders every time
}

// With useCallback (same function reference)
function Parent({ items }) {
  const handleClick = useCallback((id) => {
    // handle click
  }, [items]); // Only changes if items change
  return <Child onClick={handleClick} />; // Child doesn't re-render unnecessarily
}

When to use:
- useMemo: Expensive calculations, derived values
- useCallback: Functions passed to memoized children, functions in dependency arrays

Don't overuse - they have their own overhead!`,
    difficulty: "Medium",
    category: "React",
    tags: ["Hooks", "Performance", "Memoization"],
    timeToAnswer: "8-12 minutes",
    frequency: "Very High",
  },
  {
    id: 23,
    question: "Explain useEffect cleanup and when to use it",
    answer: `useEffect cleanup runs when:
- Component unmounts
- Before effect runs again (if dependencies changed)

// Cleanup example
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);

Common cleanup scenarios:

1. Clearing timers
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer);
}, []);

2. Cancelling API requests
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);

3. Removing event listeners
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

4. Cleaning up subscriptions
useEffect(() => {
  const subscription = store.subscribe(() => {});
  return () => subscription.unsubscribe();
}, []);

Important: Always clean up to prevent memory leaks!`,
    difficulty: "Medium",
    category: "React",
    tags: ["useEffect", "Hooks", "Memory Leaks"],
    timeToAnswer: "7-10 minutes",
    frequency: "High",
  },
  {
    id: 24,
    question: "What is Context API and when should you use it?",
    answer: `Context API allows passing data through component tree without prop drilling.

// Creating context
const ThemeContext = createContext();

// Provider
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// Consumer
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <header className={theme}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </header>
  );
}

When to use Context:
- Global state (theme, auth, language)
- Data needed by many components
- Avoiding prop drilling

When NOT to use:
- State needed by only one component (use useState)
- State needed by few components (pass props)
- Frequently changing data (can cause performance issues)

Best practices:
- Split contexts by concern (ThemeContext, AuthContext)
- Keep contexts focused
- Use custom hooks to access context`,
    difficulty: "Medium",
    category: "React",
    tags: ["Context API", "State Management", "Props"],
    timeToAnswer: "8-12 minutes",
    frequency: "High",
  },
  {
    id: 25,
    question: "Explain React rendering and re-rendering",
    answer: `Rendering is when React creates a Virtual DOM tree from components.

Re-rendering happens when:
1. State changes (useState, useReducer)
2. Props change
3. Parent component re-renders
4. Context value changes

// Component re-renders when state changes
function Counter() {
  const [count, setCount] = useState(0);
  
  console.log('Rendered'); // Logs on every render
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

React optimizes re-renders:
- Only updates changed DOM nodes
- Batching state updates
- Virtual DOM diffing

Prevent unnecessary re-renders:
1. React.memo for components
2. useMemo for values
3. useCallback for functions
4. Split components (isolate state)

// Parent re-renders cause child re-renders
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent: {count}</button>
      <Child /> {/* Re-renders when parent does */}
    </div>
  );
}

// Memo prevents unnecessary re-render
const Child = React.memo(() => {
  return <div>Child</div>;
});`,
    difficulty: "Hard",
    category: "React",
    tags: ["Rendering", "Performance", "Virtual DOM"],
    timeToAnswer: "10-15 minutes",
    frequency: "Very High",
  },

  // More Next.js Questions
  {
    id: 26,
    question: "What are Server Components in Next.js 13+?",
    answer: `Server Components run only on the server, reducing JavaScript sent to client.

Key features:
- Run only on server (no client JavaScript)
- Can directly access databases and APIs
- Cannot use client-side features (useState, useEffect, browser APIs)
- Better performance and SEO

// Server Component (default)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return <div>{json.title}</div>; // No JavaScript sent to client
}

// Client Component (needs 'use client')
'use client';
function ClientComponent() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(state + 1)}>{state}</button>;
}

Benefits:
- Smaller bundle size
- Better performance
- Direct database access
- Improved SEO
- Faster initial load

When to use:
- Server: Data fetching, static content
- Client: Interactivity, browser APIs, state management`,
    difficulty: "Medium",
    category: "Next.js",
    tags: ["Server Components", "App Router", "Performance"],
    timeToAnswer: "10-12 minutes",
    frequency: "High",
  },
  {
    id: 27,
    question: "What is the difference between App Router and Pages Router?",
    answer: `App Router (Next.js 13+):
- Uses 'app' directory
- Server Components by default
- Nested layouts
- Streaming and Suspense
- Better performance
- More modern API

// App Router structure
app/
  layout.js       // Root layout
  page.js        // Home page
  dashboard/
    layout.js    // Dashboard layout
    page.js      // Dashboard page

Pages Router (Traditional):
- Uses 'pages' directory
- Client Components by default
- getServerSideProps, getStaticProps
- Simpler mental model
- More mature, stable

// Pages Router structure
pages/
  index.js       // Home page
  _app.js        // Custom App
  dashboard.js   // Dashboard page

Key differences:
1. Layout system (App Router has nested layouts)
2. Data fetching (App Router uses async components)
3. Loading states (App Router has loading.js)
4. Error handling (App Router has error.js)
5. Streaming (App Router supports it natively)

Migration: Can use both in same project gradually`,
    difficulty: "Medium",
    category: "Next.js",
    tags: ["App Router", "Pages Router", "Routing"],
    timeToAnswer: "8-12 minutes",
    frequency: "Very High",
  },
  {
    id: 28,
    question: "How do you handle environment variables in Next.js?",
    answer: `Next.js supports environment variables through .env files.

1. .env.local (for local development, gitignored)
2. .env (default for all environments)
3. .env.development (development only)
4. .env.production (production only)

// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
SECRET_KEY=secret123

Accessing variables:
- Server-side: process.env.VARIABLE_NAME
- Client-side: NEXT_PUBLIC_ prefix required

// Server Component
async function ServerComponent() {
  const apiKey = process.env.API_KEY; // ✅ Works
  const data = await fetch(apiUrl);
  return <div>{data}</div>;
}

// Client Component
'use client';
function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Works (has prefix)
  // const secret = process.env.SECRET_KEY; // ❌ Won't work (no prefix)
  
  return <div>API: {apiUrl}</div>;
}

Security:
- Never expose secrets to client
- Use NEXT_PUBLIC_ only for public variables
- Keep .env.local in .gitignore
- Use Vercel Environment Variables for production`,
    difficulty: "Easy",
    category: "Next.js",
    tags: ["Environment Variables", "Configuration", "Security"],
    timeToAnswer: "5-8 minutes",
    frequency: "High",
  },

  // More HTML/CSS Questions
  {
    id: 29,
    question: "What is CSS Grid and how does it differ from Flexbox?",
    answer: `CSS Grid: Two-dimensional layout system (rows AND columns)
Flexbox: One-dimensional layout system (rows OR columns)

Grid:
- Designed for 2D layouts
- Items can span multiple rows/columns
- Grid lines and areas
- Better for page-level layouts

.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}

Flexbox:
- Designed for 1D layouts
- Items flow in one direction
- Better for component-level layouts
- More flexible for responsive design

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

When to use:
- Grid: Page layouts, complex 2D arrangements
- Flexbox: Component layouts, alignment, spacing

Best practice: Use both together!
- Grid for overall layout
- Flexbox for components inside grid`,
    difficulty: "Medium",
    category: "HTML/CSS",
    tags: ["CSS Grid", "Flexbox", "Layout"],
    timeToAnswer: "8-10 minutes",
    frequency: "Very High",
  },
  {
    id: 30,
    question: "How do you ensure website accessibility?",
    answer: `Accessibility (a11y) ensures websites are usable by everyone, including people with disabilities.

1. Semantic HTML
<!-- Good -->
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

<!-- Bad -->
<div class="nav">
  <div class="link">Home</div>
</div>

2. ARIA attributes
<button aria-label="Close dialog">×</button>
<div role="alert" aria-live="polite">Error message</div>

3. Keyboard navigation
- All interactive elements should be keyboard accessible
- Focus indicators visible
- Logical tab order

4. Alt text for images
<img src="photo.jpg" alt="Description of image" />

5. Color contrast
- WCAG AA: 4.5:1 for normal text
- WCAG AAA: 7:1 for normal text
- Use contrast checkers

6. Form labels
<label for="email">Email</label>
<input id="email" type="email" />

7. Screen reader support
- Proper heading hierarchy (h1, h2, h3)
- Descriptive link text
- Skip navigation links

8. Testing
- Keyboard navigation
- Screen readers (NVDA, JAWS, VoiceOver)
- Automated tools (axe, WAVE)`,
    difficulty: "Medium",
    category: "HTML/CSS",
    tags: ["Accessibility", "a11y", "Semantic HTML"],
    timeToAnswer: "10-15 minutes",
    frequency: "High",
  },
  {
    id: 31,
    question: "Explain CSS specificity and how it works",
    answer: `CSS specificity determines which styles are applied when multiple rules target the same element.

Specificity calculation (from highest to lowest):
1. Inline styles (1000 points)
2. IDs (100 points each)
3. Classes, attributes, pseudo-classes (10 points each)
4. Elements, pseudo-elements (1 point each)

Examples:
#header .nav a { }        /* 111 points */
.nav a:hover { }          /* 21 points */
div a { }                 /* 2 points */
a { }                     /* 1 point */

Important rules:
- !important overrides everything (avoid if possible)
- More specific selectors win
- If equal specificity, last rule wins (cascading)

<!-- HTML -->
<div id="header" class="container">
  <nav class="nav">
    <a href="#" class="link">Link</a>
  </nav>
</div>

/* Rule 1: 111 points */
#header .nav .link { color: red; }

/* Rule 2: 21 points */
.nav .link { color: blue; }

/* Result: red (higher specificity) */

Tips:
- Avoid overly specific selectors
- Use classes over IDs for styling
- Keep specificity low for maintainability`,
    difficulty: "Medium",
    category: "HTML/CSS",
    tags: ["CSS", "Specificity", "Selectors"],
    timeToAnswer: "7-10 minutes",
    frequency: "High",
  },
  {
    id: 32,
    question: "What are CSS Variables and how do you use them?",
    answer: `CSS Variables (Custom Properties) allow you to store values for reuse throughout stylesheet.

Declaration:
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}

Usage:
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  font-size: calc(var(--font-size-base) * 1.25);
}

Benefits:
- Easy theme switching
- Consistent values
- Runtime changes
- Scoped variables

Scoping:
:root { --color: blue; }        /* Global */
.container { --color: red; }    /* Scoped to .container */
.container p { color: var(--color); } /* Uses red */

Fallback values:
.element {
  color: var(--undefined-var, #000); /* Falls back to black */
}

Dynamic changes:
document.documentElement.style.setProperty('--primary-color', '#ff0000');`,
    difficulty: "Easy",
    category: "HTML/CSS",
    tags: ["CSS Variables", "Custom Properties", "Theming"],
    timeToAnswer: "5-7 minutes",
    frequency: "High",
  },

  // General Frontend Questions
  {
    id: 33,
    question: "What is the difference between localStorage and sessionStorage?",
    answer: `localStorage:
- Persists until explicitly cleared
- Survives browser restarts
- Shared across tabs/windows (same origin)
- ~5-10MB storage limit
- Same API as sessionStorage

sessionStorage:
- Persists only for browser session
- Cleared when tab/window closes
- Isolated per tab/window
- ~5-10MB storage limit
- Same API as localStorage

// localStorage
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear(); // Clears all

// sessionStorage
sessionStorage.setItem('key', 'value');
const value = sessionStorage.getItem('key');
sessionStorage.removeItem('key');
sessionStorage.clear(); // Clears all

// Both store strings only
localStorage.setItem('user', JSON.stringify({ name: 'John' }));
const user = JSON.parse(localStorage.getItem('user'));

When to use:
- localStorage: User preferences, theme, persistent data
- sessionStorage: Temporary data, form drafts, session-specific data`,
    difficulty: "Easy",
    category: "JavaScript",
    tags: ["localStorage", "sessionStorage", "Browser APIs"],
    timeToAnswer: "3-5 minutes",
    frequency: "High",
  },
  {
    id: 34,
    question: "What is CORS and how do you handle it?",
    answer: `CORS (Cross-Origin Resource Sharing) is a security mechanism that restricts web pages from making requests to different domains.

Same-origin: Same protocol, domain, and port
- http://example.com/page1 ✅ http://example.com/page2
- http://example.com ❌ https://example.com
- http://example.com ❌ http://other.com

How CORS works:
1. Browser sends preflight OPTIONS request
2. Server responds with allowed methods/headers
3. Browser allows or blocks the actual request

Server-side solution:
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Allow all origins (development only)
res.header('Access-Control-Allow-Origin', '*');

Client-side:
- Cannot be fixed from client
- Use proxy in development
- Ensure server has proper CORS headers

Next.js API route proxy:
// pages/api/proxy.js
export default async function handler(req, res) {
  const response = await fetch('https://external-api.com/data');
  const data = await response.json();
  res.json(data); // Same origin, no CORS issue
}`,
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["CORS", "Security", "APIs"],
    timeToAnswer: "8-12 minutes",
    frequency: "High",
  },
  {
    id: 35,
    question: "What are Web APIs and how do they work?",
    answer: `Web APIs are interfaces provided by browsers to interact with browser features and web services.

Common Web APIs:
1. Fetch API - HTTP requests
const data = await fetch('/api/users')
  .then(r => r.json());

2. DOM API - Document manipulation
document.getElementById('myId');
element.addEventListener('click', handler);

3. localStorage/sessionStorage
localStorage.setItem('key', 'value');

4. Geolocation API
navigator.geolocation.getCurrentPosition((pos) => {
  console.log(pos.coords.latitude);
});

5. Canvas API - Drawing
const ctx = canvas.getContext('2d');
ctx.fillRect(10, 10, 50, 50);

6. WebSocket API
const socket = new WebSocket('ws://example.com');
socket.onmessage = (event) => {
  console.log(event.data);
};

7. Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
    }
  });
});

8. Media APIs
navigator.mediaDevices.getUserMedia({ video: true });

Browser compatibility:
- Check caniuse.com
- Use polyfills for older browsers
- Progressive enhancement`,
    difficulty: "Medium",
    category: "JavaScript",
    tags: ["Web APIs", "Browser APIs", "JavaScript"],
    timeToAnswer: "10-15 minutes",
    frequency: "Medium",
  },
];

const categories = ["All", "JavaScript", "React", "Next.js", "HTML/CSS"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const timeRanges = [
  "All",
  "1-3 minutes",
  "3-5 minutes",
  "5-8 minutes",
  "8-10 minutes",
  "10-15 minutes",
];

export default function InterviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((question) => {
      const matchesSearch =
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || question.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        question.difficulty === selectedDifficulty;
      const matchesTime =
        selectedTime === "All" || question.timeToAnswer === selectedTime;

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesTime
      );
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedTime]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "JavaScript":
        return Code;
      case "React":
        return Zap;
      case "Next.js":
        return FileText;
      case "HTML/CSS":
        return Palette;
      default:
        return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        {/* Header Section with Subjects */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          {/* Subjects Navigation */}
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={subject.href}
                  className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg lg:rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-sm lg:text-base"
                >
                  <subject.icon size={18} />
                  <span>{subject.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* Page Header */}
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
            Practice with comprehensive frontend interview questions covering
            JavaScript, React, Next.js, and HTML/CSS
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
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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
              {showFilters ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
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
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
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
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
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
                      {timeRanges.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
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
            Showing {filteredQuestions.length} of {allQuestions.length}{" "}
            questions
          </p>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => {
            const CategoryIcon = getCategoryIcon(question.category);

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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
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
                        {question.tags.map((tag) => (
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
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === question.id ? null : question.id
                        )
                      }
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
                        animate={{ opacity: 1, height: "auto" }}
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
            );
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
  );
}
