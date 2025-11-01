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
  BookOpen,
  Trophy
} from 'lucide-react'

const subjects = [
  {
    title: 'JavaScript',
    href: '/javascript',
    icon: Code,
  },
  {
    title: 'React',
    href: '/react',
    icon: Zap,
  },
  {
    title: 'Next.js',
    href: '/nextjs',
    icon: FileText,
  },
  {
    title: 'HTML & CSS',
    href: '/html-css',
    icon: Palette,
  },
  {
    title: 'Interview Prep',
    href: '/interview',
    icon: HelpCircle,
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
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
    </div>
  )
}