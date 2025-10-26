'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Code, 
  Zap, 
  FileText, 
  Palette, 
  HelpCircle, 
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Trophy
} from 'lucide-react'

const features = [
  {
    title: 'JavaScript Fundamentals',
    description: 'Master ES6+, async programming, closures, and modern JavaScript concepts',
    icon: Code,
    href: '/javascript',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    title: 'React Development',
    description: 'Learn hooks, state management, component lifecycle, and best practices',
    icon: Zap,
    href: '/react',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    title: 'Next.js Framework',
    description: 'Server-side rendering, API routes, file-based routing, and optimization',
    icon: FileText,
    href: '/nextjs',
    color: 'from-gray-600 to-gray-800'
  },
  {
    title: 'HTML & CSS',
    description: 'Semantic markup, responsive design, CSS Grid, Flexbox, and animations',
    icon: Palette,
    href: '/html-css',
    color: 'from-pink-400 to-rose-500'
  },
  {
    title: 'Interview Prep',
    description: 'Common interview questions, coding challenges, and technical discussions',
    icon: HelpCircle,
    href: '/interview',
    color: 'from-green-400 to-emerald-500'
  }
]

const stats = [
  { label: 'Topics Covered', value: '50+', icon: BookOpen },
  { label: 'Interview Questions', value: '200+', icon: HelpCircle },
  { label: 'Code Examples', value: '100+', icon: Code },
  { label: 'Success Rate', value: '95%', icon: Trophy }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 lg:pl-96">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Frontend
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">Mastery</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Master modern frontend development with comprehensive tutorials, 
              interactive examples, and interview preparation
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/javascript"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Start Learning
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/interview"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Interview Prep
                <Trophy className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <stat.icon className="mx-auto mb-3 text-blue-500" size={32} />
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 lg:pl-96">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              What You'll Learn
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive coverage of all essential frontend technologies and concepts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-500 font-semibold group-hover:text-blue-600 transition-colors duration-300">
                      Learn More
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:pl-96">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Master Frontend Development?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who have accelerated their careers with our comprehensive tutorials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/javascript"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Start with JavaScript
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/interview"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Practice Interviews
                <Trophy className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}