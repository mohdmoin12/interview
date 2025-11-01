"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Code,
  Play,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Zap,
  FileText,
  Palette,
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

const topics = [
  {
    title: "ES6+ Features",
    icon: Code,
    color: "from-yellow-400 to-orange-500",
    subtopics: [
      {
        title: "Arrow Functions",
        content: `Arrow functions provide a more concise syntax for writing functions.

// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Benefits:
// - Shorter syntax
// - Lexical 'this' binding
// - Implicit return for single expressions`,
        example: `// Example: Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];

// Map with arrow function
const doubled = numbers.map(n => n * 2);

// Filter with arrow function
const evens = numbers.filter(n => n % 2 === 0);

// Reduce with arrow function
const sum = numbers.reduce((acc, n) => acc + n, 0);`,
      },
      {
        title: "Destructuring",
        content: `Destructuring allows you to extract values from arrays or objects into distinct variables.

// Array destructuring
const [first, second, third] = [1, 2, 3];

// Object destructuring
const { name, age, city } = { name: 'John', age: 30, city: 'New York' };

// Default values
const { name = 'Anonymous', age = 0 } = {};`,
        example: `// Practical examples
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

// Destructure nested objects
const { name, address: { city } } = user;

// Function parameters
function greet({ name, age = 0 }) {
  return \`Hello \${name}, you are \${age} years old\`;
}`,
      },
      {
        title: "Template Literals",
        content: `Template literals use backticks (\`) and allow for multi-line strings and string interpolation.

// Basic template literal
const name = 'World';
const greeting = \`Hello \${name}!\`;

// Multi-line strings
const html = \`
  <div>
    <h1>\${title}</h1>
    <p>\${content}</p>
  </div>
\`;`,
        example: `// Advanced template literal examples
const user = { name: 'John', age: 30, city: 'New York' };

// Complex interpolation
const message = \`
  User: \${user.name}
  Age: \${user.age}
  Location: \${user.city}
  Status: \${user.age >= 18 ? 'Adult' : 'Minor'}
\`;

// Tagged template literals
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
  }, '');
}`,
      },
    ],
  },
  {
    title: "Async Programming",
    icon: Play,
    color: "from-blue-400 to-cyan-500",
    subtopics: [
      {
        title: "Promises",
        content: `Promises represent the eventual completion or failure of an asynchronous operation.

// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

// Using promises
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
        example: `// Practical promise example
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: 'John Doe',
          email: 'john@example.com'
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

// Using the promise
fetchUserData(1)
  .then(user => console.log('User:', user))
  .catch(error => console.error('Error:', error.message));`,
      },
      {
        title: "Async/Await",
        content: `Async/await provides a cleaner way to work with promises.

// Async function
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using async/await
const data = await fetchData();`,
        example: `// Multiple async operations
async function fetchUserAndPosts(userId) {
  try {
    // Fetch user and posts in parallel
    const [userResponse, postsResponse] = await Promise.all([
      fetch(\`/api/users/\${userId}\`),
      fetch(\`/api/users/\${userId}/posts\`)
    ]);
    
    const user = await userResponse.json();
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}`,
      },
    ],
  },
  {
    title: "Closures & Scope",
    icon: BookOpen,
    color: "from-green-400 to-emerald-500",
    subtopics: [
      {
        title: "Understanding Closures",
        content: `A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function returns.

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
console.log(closure(5)); // 15`,
        example: `// Practical closure example - Counter
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
console.log(counter.increment()); // 12
console.log(counter.getValue());  // 12`,
      },
      {
        title: "Lexical Scoping",
        content: `Lexical scoping means that inner functions have access to variables in their outer scope.

const globalVar = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(globalVar); // 'global'
    console.log(outerVar);  // 'outer'
    console.log(innerVar);  // 'inner'
  }
  
  inner();
}`,
        example: `// Module pattern using closures
const Calculator = (function() {
  let result = 0;
  
  return {
    add: (x) => result += x,
    subtract: (x) => result -= x,
    multiply: (x) => result *= x,
    divide: (x) => result /= x,
    getResult: () => result,
    reset: () => result = 0
  };
})();

Calculator.add(5);        // result = 5
Calculator.multiply(3);   // result = 15
console.log(Calculator.getResult()); // 15`,
      },
    ],
  },
];

const interviewQuestions = [
  {
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
    category: "Variables & Scope",
  },
  {
    question: "Explain the concept of 'this' in JavaScript",
    answer: `'this' refers to the object that is currently executing the function. Its value depends on how the function is called:

1. Global context: 'this' refers to the global object (window in browser)
2. Object method: 'this' refers to the object
3. Constructor: 'this' refers to the new instance
4. Arrow functions: 'this' is lexically bound

// Examples:
const obj = {
  name: 'John',
  greet: function() {
    console.log(this.name); // 'John'
  },
  greetArrow: () => {
    console.log(this.name); // undefined (lexical this)
  }
};

obj.greet(); // 'John'
obj.greetArrow(); // undefined`,
    difficulty: "Medium",
    category: "Functions & Context",
  },
  {
    question: "What are closures and why are they useful?",
    answer: `Closures allow functions to access variables from their outer scope even after the outer function returns. They're useful for:

1. Data privacy and encapsulation
2. Creating function factories
3. Implementing modules
4. Maintaining state in callbacks

// Example:
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15`,
    difficulty: "Medium",
    category: "Closures & Scope",
  },
];

export default function JavaScriptPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [expandedSubtopic, setExpandedSubtopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
            JavaScript Fundamentals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master modern JavaScript with ES6+ features, async programming,
            closures, and more
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
                onClick={() =>
                  setExpandedTopic(
                    expandedTopic === topicIndex ? null : topicIndex
                  )
                }
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${topic.color} flex items-center justify-center`}
                  >
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
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6 space-y-4">
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <div
                          key={subtopic.title}
                          className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                        >
                          <button
                            onClick={() =>
                              setExpandedSubtopic(
                                expandedSubtopic === subtopicIndex
                                  ? null
                                  : subtopicIndex
                              )
                            }
                            className="w-full flex items-center justify-between mb-4"
                          >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {subtopic.title}
                            </h3>
                            {expandedSubtopic === subtopicIndex ? (
                              <ChevronDown
                                className="text-gray-500"
                                size={20}
                              />
                            ) : (
                              <ChevronRight
                                className="text-gray-500"
                                size={20}
                              />
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedSubtopic === subtopicIndex && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                              >
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                    <BookOpen className="mr-2" size={16} />
                                    Concept
                                  </h4>
                                  <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                    {subtopic.content}
                                  </pre>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                                    <Code className="mr-2" size={16} />
                                    Example
                                  </h4>
                                  <pre className="text-sm text-blue-600 dark:text-blue-400 whitespace-pre-wrap">
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
            Common Interview Questions
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          qa.difficulty === "Easy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : qa.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {qa.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {qa.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setShowAnswer(showAnswer === index ? null : index)
                    }
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
                      animate={{ opacity: 1, height: "auto" }}
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
  );
}
