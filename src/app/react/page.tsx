'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  Play, 
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Code,
  RefreshCw,
  Heart,
  Star,
  BookOpen
} from 'lucide-react'

const topics = [
  {
    title: 'Hooks',
    icon: Zap,
    color: 'from-blue-400 to-cyan-500',
    subtopics: [
      {
        title: 'useState Hook',
        content: `useState is a React Hook that lets you add state to functional components.

// Basic usage
const [state, setState] = useState(initialValue);

// The setState function can accept:
// 1. A new value directly
// 2. A function that receives the previous state

// Example:
const [count, setCount] = useState(0);
const [name, setName] = useState('');

// Update state
setCount(count + 1);
setCount(prevCount => prevCount + 1);`,
        example: `// Interactive counter example
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`
      },
      {
        title: 'useEffect Hook',
        content: `useEffect lets you perform side effects in functional components.

// Basic syntax
useEffect(() => {
  // Side effect code
}, [dependencies]);

// Dependencies array controls when effect runs:
// [] - Run once after initial render
// [value] - Run when value changes
// No array - Run after every render

// Cleanup function
useEffect(() => {
  const timer = setInterval(() => {
    // Some action
  }, 1000);
  
  return () => clearInterval(timer); // Cleanup
}, []);`,
        example: `// Data fetching example
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // Re-run when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return <div>{user.name}</div>;
}`
      },
      {
        title: 'useContext Hook',
        content: `useContext provides a way to pass data through the component tree without prop drilling.

// 1. Create a context
const ThemeContext = createContext();

// 2. Provide the context
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// 3. Consume the context
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}`,
        example: `// Complete context example
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({ name: 'John Doe', email: 'john@example.com' });
      setLoading(false);
    }, 1000);
  }, []);
  
  const value = {
    user,
    setUser,
    loading,
    login: (userData) => setUser(userData),
    logout: () => setUser(null)
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}`
      }
    ]
  },
  {
    title: 'Component Lifecycle',
    icon: RefreshCw,
    color: 'from-green-400 to-emerald-500',
    subtopics: [
      {
        title: 'Mounting Phase',
        content: `The mounting phase occurs when a component is first created and inserted into the DOM.

// Class component lifecycle
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
  }
  
  componentDidMount() {
    // Component is mounted to DOM
    // Perfect for API calls, timers, etc.
  }
  
  render() {
    return <div>My Component</div>;
  }
}

// Functional component equivalent
function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Equivalent to componentDidMount
    fetchData();
  }, []); // Empty dependency array
  
  return <div>My Component</div>;
}`,
        example: `// Mounting example with data fetching
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This runs after component mounts
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []); // Empty array = run once after mount
  
  if (loading) return <div>Loading users...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`
      },
      {
        title: 'Updating Phase',
        content: `The updating phase occurs when a component's state or props change.

// Class component
class Counter extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Count changed from', prevProps.count, 'to', this.state.count);
    }
  }
}

// Functional component
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Runs after every update
    console.log('Count is now:', count);
  }); // No dependency array = run after every render
  
  useEffect(() => {
    // Runs only when count changes
    console.log('Count changed to:', count);
  }, [count]); // Dependency array with count
}`,
        example: `// Update example with document title
function DocumentTitle({ title }) {
  useEffect(() => {
    // Update document title when title prop changes
    document.title = title;
    
    // Cleanup: restore original title when component unmounts
    return () => {
      document.title = 'Original Title';
    };
  }, [title]); // Re-run when title changes
  
  return <h1>{title}</h1>;
}

// Usage
function App() {
  const [pageTitle, setPageTitle] = useState('Home');
  
  return (
    <div>
      <DocumentTitle title={pageTitle} />
      <button onClick={() => setPageTitle('About')}>
        Go to About
      </button>
    </div>
  );
}`
      }
    ]
  },
  {
    title: 'State Management',
    icon: Star,
    color: 'from-purple-400 to-pink-500',
    subtopics: [
      {
        title: 'Lifting State Up',
        content: `When multiple components need to share state, lift the state up to their common parent.

// Before: State in child components
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

// Parent component manages state
function Calculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');
  
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  
  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={setTemperature}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={setTemperature}
      />
    </div>
  );
}`,
        example: `// Shopping cart example
function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
      />
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', quantity: 2 },
    { id: 2, name: 'Banana', quantity: 1 }
  ]);
  
  const updateQuantity = (id, quantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />
      ))}
    </div>
  );
}`
      },
      {
        title: 'useReducer Hook',
        content: `useReducer is an alternative to useState for complex state logic.

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.value };
    default:
      throw new Error('Unknown action type');
  }
}

// Component using useReducer
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}`,
        example: `// Todo list with useReducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        id: Date.now(),
        text: action.text,
        completed: false
      }];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'delete':
      return state.filter(todo => todo.id !== action.id);
    case 'clear':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'add', text: input });
      setInput('');
    }
  };
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'toggle', id: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`
      }
    ]
  }
]

const interviewQuestions = [
  {
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
    category: 'State & Props'
  },
  {
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
    category: 'Virtual DOM'
  },
  {
    question: "What are React Keys and why are they important?",
    answer: `Keys help React identify which items have changed, been added, or removed.

Why keys are important:
- Help React efficiently update the list
- Prevent unnecessary re-renders
- Maintain component state during re-renders
- Improve performance

// Good: Using unique, stable keys
const todoList = todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
));

// Bad: Using array index as key
const todoList = todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
));

// When to use index as key:
// - List items don't change order
// - Items don't get added/removed
// - No form inputs in list items`,
    difficulty: 'Easy',
    category: 'Lists & Keys'
  }
]

// Interactive Counter Component
function InteractiveCounter() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState<number[]>([])

  const increment = () => {
    setCount(prev => {
      const newCount = prev + 1
      setHistory(prev => [...prev, newCount])
      return newCount
    })
  }

  const decrement = () => {
    setCount(prev => {
      const newCount = prev - 1
      setHistory(prev => [...prev, newCount])
      return newCount
    })
  }

  const reset = () => {
    setCount(0)
    setHistory([])
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Interactive Counter Example</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
        <div className="space-x-2">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
        {history.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">History:</p>
            <div className="flex flex-wrap gap-1">
              {history.slice(-10).map((value, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReactPage() {
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-6">
            React Development
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master React with hooks, component lifecycle, state management, and modern patterns
          </p>
        </motion.div>

        {/* Interactive Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <InteractiveCounter />
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
            React Interview Questions
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
