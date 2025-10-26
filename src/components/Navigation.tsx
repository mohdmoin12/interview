'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Code, 
  Palette, 
  Zap, 
  FileText, 
  HelpCircle, 
  Sun, 
  Moon,
  Home,
  ChevronRight
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'JavaScript', href: '/javascript', icon: Code },
  { name: 'React', href: '/react', icon: Zap },
  { name: 'Next.js', href: '/nextjs', icon: FileText },
  { name: 'HTML/CSS', href: '/html-css', icon: Palette },
  { name: 'Interview Q&A', href: '/interview', icon: HelpCircle },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </motion.button>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Frontend Mastery
                </h1>
              </div>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                      {isActive && <ChevronRight size={16} className="ml-auto" />}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-80 lg:bg-white lg:dark:bg-gray-900 lg:shadow-xl lg:border-r lg:border-gray-200 lg:dark:border-gray-700"
      >
        <div className="p-8 h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frontend Mastery
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Complete Tutorial & Interview Prep
            </p>
          </motion.div>

          <nav className="space-y-3 flex-1">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:transform hover:scale-105'
                    }`}
                  >
                    <item.icon size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium text-lg">{item.name}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Master frontend development with comprehensive tutorials and interview preparation
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        )}
      </AnimatePresence>
    </>
  )
}
