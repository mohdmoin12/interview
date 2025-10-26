'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Play, 
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Code,
  Zap,
  Globe,
  Database,
  Settings
} from 'lucide-react'

const topics = [
  {
    title: 'File-based Routing',
    icon: FileText,
    color: 'from-gray-600 to-gray-800',
    subtopics: [
      {
        title: 'Pages Directory',
        content: `Next.js uses file-based routing where the file structure in the pages directory determines the routes.

// pages/index.js -> /
// pages/about.js -> /about
// pages/blog/index.js -> /blog
// pages/blog/[slug].js -> /blog/:slug
// pages/blog/[...slug].js -> /blog/*

// Dynamic routes
// pages/users/[id].js -> /users/:id
// pages/posts/[id]/comments/[commentId].js -> /posts/:id/comments/:commentId

// API routes
// pages/api/users.js -> /api/users
// pages/api/users/[id].js -> /api/users/:id

// Nested routes
// pages/dashboard/settings.js -> /dashboard/settings
// pages/dashboard/profile.js -> /dashboard/profile`,
        example: `// pages/blog/[slug].js
import { useRouter } from 'next/router'

function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>This is the blog post content for {slug}</p>
    </div>
  )
}

export default BlogPost

// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    // Fetch post by ID
    res.status(200).json({ id, title: 'Post Title' })
  } else if (req.method === 'PUT') {
    // Update post
    res.status(200).json({ message: 'Post updated' })
  } else if (req.method === 'DELETE') {
    // Delete post
    res.status(200).json({ message: 'Post deleted' })
  }
}`
      },
      {
        title: 'App Directory (App Router)',
        content: `The App Router is the new routing system in Next.js 13+ that uses the app directory.

// app/page.js -> /
// app/about/page.js -> /about
// app/blog/page.js -> /blog
// app/blog/[slug]/page.js -> /blog/:slug

// Layout files
// app/layout.js -> Root layout for all pages
// app/blog/layout.js -> Layout for all blog pages

// Loading and error files
// app/loading.js -> Loading UI
// app/error.js -> Error UI
// app/not-found.js -> 404 page

// Route groups
// app/(marketing)/about/page.js -> /about
// app/(dashboard)/settings/page.js -> /settings`,
        example: `// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        {children}
      </body>
    </html>
  )
}

// app/page.js
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <p>This is the home page</p>
    </div>
  )
}

// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  )
}`
      }
    ]
  },
  {
    title: 'Server-Side Rendering',
    icon: Globe,
    color: 'from-blue-400 to-cyan-500',
    subtopics: [
      {
        title: 'getServerSideProps',
        content: `getServerSideProps runs on the server on every request and returns data to the page component.

// This function runs on the server
export async function getServerSideProps(context) {
  const { params, query, req, res } = context
  
  // Fetch data from API
  const data = await fetchData()
  
  // Return props that will be passed to the page component
  return {
    props: {
      data
    }
  }
}

// The page component receives the props
function Page({ data }) {
  return <div>{data.title}</div>
}

export default Page

// Context object contains:
// - params: Dynamic route parameters
// - query: Query string parameters
// - req: HTTP request object
// - res: HTTP response object
// - preview: Boolean indicating if in preview mode`,
        example: `// pages/posts/[id].js
import { GetServerSideProps } from 'next'

function Post({ post, comments }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.params
  
  try {
    // Fetch post data
    const postRes = await fetch(\`https://api.example.com/posts/\${id}\`)
    const post = await postRes.json()
    
    // Fetch comments
    const commentsRes = await fetch(\`https://api.example.com/posts/\${id}/comments\`)
    const comments = await commentsRes.json()
    
    return {
      props: {
        post,
        comments
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default Post`
      },
      {
        title: 'Static Site Generation',
        content: `getStaticProps generates static pages at build time, making them faster and more SEO-friendly.

// This function runs at build time
export async function getStaticProps() {
  // Fetch data from API or database
  const data = await fetchData()
  
  return {
    props: {
      data
    },
    // Optional: Revalidate every 60 seconds
    revalidate: 60
  }
}

// For dynamic routes, also need getStaticPaths
export async function getStaticPaths() {
  // Fetch all possible paths
  const paths = await fetchAllPaths()
  
  return {
    paths,
    // Fallback: true means generate pages on-demand
    // Fallback: false means return 404 for unknown paths
    fallback: true
  }
}`,
        example: `// pages/posts/[id].js
import { GetStaticProps, GetStaticPaths } from 'next'

function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Published: {post.publishedAt}</p>
    </div>
  )
}

export const getStaticPaths = async () => {
  // Fetch all post IDs
  const posts = await fetch('https://api.example.com/posts')
  const data = await posts.json()
  
  const paths = data.map(post => ({
    params: { id: post.id.toString() }
  }))
  
  return {
    paths,
    fallback: false // or true for on-demand generation
  }
}

export const getStaticProps = async ({ params }) => {
  const { id } = params
  
  try {
    const res = await fetch(\`https://api.example.com/posts/\${id}\`)
    const post = await res.json()
    
    return {
      props: {
        post
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default Post`
      }
    ]
  },
  {
    title: 'API Routes',
    icon: Database,
    color: 'from-green-400 to-emerald-500',
    subtopics: [
      {
        title: 'Creating API Routes',
        content: `API routes allow you to create API endpoints within your Next.js application.

// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' })
}

// HTTP Methods
// GET: Fetch data
// POST: Create data
// PUT: Update data
// DELETE: Remove data
// PATCH: Partial update

// Request object (req) contains:
// - method: HTTP method
// - query: Query string parameters
// - body: Request body
// - cookies: Request cookies
// - headers: Request headers

// Response object (res) methods:
// - res.status(code): Set status code
// - res.json(data): Send JSON response
// - res.send(data): Send response
// - res.redirect(url): Redirect to URL`,
        example: `// pages/api/users.js
export default async function handler(req, res) {
  const { method } = req
  
  switch (method) {
    case 'GET':
      try {
        const users = await fetchUsers()
        res.status(200).json(users)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
      }
      break
      
    case 'POST':
      try {
        const { name, email } = req.body
        
        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email required' })
        }
        
        const user = await createUser({ name, email })
        res.status(201).json(user)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' })
      }
      break
      
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(\`Method \${method} Not Allowed\`)
  }
}

// pages/api/users/[id].js
export default async function handler(req, res) {
  const { id } = req.query
  const { method } = req
  
  switch (method) {
    case 'GET':
      const user = await fetchUser(id)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.status(200).json(user)
      break
      
    case 'PUT':
      const updatedUser = await updateUser(id, req.body)
      res.status(200).json(updatedUser)
      break
      
    case 'DELETE':
      await deleteUser(id)
      res.status(204).end()
      break
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(\`Method \${method} Not Allowed\`)
  }
}`
      },
      {
        title: 'Middleware',
        content: `Middleware allows you to run code before a request is completed.

// middleware.js (in project root)
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl
  
  // Check if the request is for a protected route
  if (pathname.startsWith('/dashboard')) {
    // Check for authentication
    const token = request.cookies.get('auth-token')
    
    if (!token) {
      // Redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('X-Custom-Header', 'my-value')
  
  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*'
  ]
}`,
        example: `// middleware.js - Rate limiting example
import { NextResponse } from 'next/server'

const rateLimitMap = new Map()

export function middleware(request) {
  const ip = request.ip || request.headers.get('x-forwarded-for')
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return NextResponse.next()
  }
  
  const { count, resetTime } = rateLimitMap.get(ip)
  
  if (now > resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return NextResponse.next()
  }
  
  if (count >= maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }
  
  rateLimitMap.set(ip, { count: count + 1, resetTime })
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}`
      }
    ]
  },
  {
    title: 'Performance Optimization',
    icon: Zap,
    color: 'from-purple-400 to-pink-500',
    subtopics: [
      {
        title: 'Image Optimization',
        content: `Next.js provides built-in image optimization with the next/image component.

import Image from 'next/image'

// Basic usage
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
/>

// With external images
<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={800}
  height={600}
/>

// Responsive images
<Image
  src="/responsive.jpg"
  alt="Responsive image"
  fill
  style={{ objectFit: 'cover' }}
/>

// Priority loading for above-the-fold images
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
/>`,
        example: `// pages/gallery.js
import Image from 'next/image'

function Gallery({ images }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      ))}
    </div>
  )
}

// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
}`
      },
      {
        title: 'Code Splitting',
        content: `Next.js automatically splits your code into smaller chunks for better performance.

// Dynamic imports for code splitting
import dynamic from 'next/dynamic'

// Load component only when needed
const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable server-side rendering for this component
})

// Load with custom loading component
const LazyComponent = dynamic(
  () => import('../components/LazyComponent'),
  {
    loading: () => <div>Loading component...</div>
  }
)

// Load multiple components
const { Component1, Component2 } = dynamic(
  () => import('../components/MultipleComponents'),
  { ssr: false }
)`,
        example: `// pages/dashboard.js
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components
const Chart = dynamic(() => import('../components/Chart'), {
  loading: () => <div>Loading chart...</div>
})

const DataTable = dynamic(() => import('../components/DataTable'), {
  loading: () => <div>Loading table...</div>
})

const AdminPanel = dynamic(() => import('../components/AdminPanel'), {
  loading: () => <div>Loading admin panel...</div>,
  ssr: false // Only load on client side
})

function Dashboard() {
  const [showAdmin, setShowAdmin] = useState(false)
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <Chart />
        <DataTable />
      </Suspense>
      
      {showAdmin && (
        <Suspense fallback={<div>Loading admin...</div>}>
          <AdminPanel />
        </Suspense>
      )}
    </div>
  )
}`
      }
    ]
  }
]

const interviewQuestions = [
  {
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
  const data = await fetchData(context.params.id)
  return { props: { data } }
}

// getStaticProps example
export async function getStaticProps() {
  const data = await fetchData()
  return { 
    props: { data },
    revalidate: 60 // Revalidate every 60 seconds
  }
}`,
    difficulty: 'Medium',
    category: 'Rendering Methods'
  },
  {
    question: "How do you handle authentication in Next.js?",
    answer: `There are several ways to handle authentication in Next.js:

1. Using middleware for route protection
2. Using getServerSideProps to check auth
3. Using third-party libraries like NextAuth.js

// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

// pages/dashboard.js
export async function getServerSideProps(context) {
  const token = context.req.cookies['auth-token']
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const user = await verifyToken(token)
  
  return {
    props: { user }
  }
}

// Using NextAuth.js
import { useSession } from 'next-auth/react'

function Dashboard() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') return <p>Access Denied</p>
  
  return <p>Welcome {session.user.name}</p>
}`,
    difficulty: 'Medium',
    category: 'Authentication'
  },
  {
    question: "What is the App Router and how does it differ from the Pages Router?",
    answer: `App Router (Next.js 13+):
- Uses the app directory instead of pages
- Built on React Server Components
- Better performance with automatic code splitting
- Nested layouts and loading states
- Streaming and Suspense support
- Better TypeScript support

Pages Router (Traditional):
- Uses the pages directory
- Client-side rendering by default
- getServerSideProps, getStaticProps, getStaticPaths
- Simpler mental model
- More mature and stable

// App Router structure
app/
  layout.js          // Root layout
  page.js           // Home page
  loading.js        // Loading UI
  error.js          // Error UI
  not-found.js      // 404 page
  dashboard/
    layout.js       // Dashboard layout
    page.js         // Dashboard page
    settings/
      page.js       // Settings page

// Pages Router structure
pages/
  index.js          // Home page
  _app.js           // App component
  _document.js      // Document component
  dashboard/
    index.js        // Dashboard page
    settings.js     // Settings page`,
    difficulty: 'Easy',
    category: 'Routing'
  }
]

export default function NextJSPage() {
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-6">
            Next.js Framework
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master Next.js with file-based routing, SSR, API routes, and performance optimization
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
                                    <FileText className="mr-2" size={16} />
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
            Next.js Interview Questions
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
