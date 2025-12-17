'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { useParams } from 'next/navigation'

// This will be replaced with your CMS or database
const getBlogPost = (slug: string) => {
  // Placeholder data - replace with actual data fetching
  return {
    slug: slug,
    title: 'Understanding GMAX Testing: The Complete Guide',
    description: 'Everything you need to know about GMAX testing for artificial turf fields',
    content: `
      <p>This is a placeholder for your blog content. In production, this would be fetched from your CMS or database.</p>
      <h2>What is GMAX Testing?</h2>
      <p>GMAX testing measures the shock-absorbing properties of athletic field surfaces...</p>
    `,
    publishedAt: '2025-01-15',
    author: {
      name: 'Field Health Systems',
      role: 'Field Safety Expert',
      avatar: '/logo-icon.svg'
    },
    category: 'Field Safety & Compliance',
    tags: ['GMAX Testing', 'Field Safety', 'ASTM F1936'],
    featured: true,
    readTime: '8 min read',
    image: '/sports-field-bg.jpg'
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = getBlogPost(slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <img
                  src="/logo-header.svg"
                  alt="Field Health Systems"
                  className="h-20 w-auto cursor-pointer"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#services" className="text-gray-700 hover:text-green-600 font-medium">Platform</Link>
              <Link href="/#athlete-safety" className="text-gray-700 hover:text-green-600 font-medium">Field Safety</Link>
              <Link href="/resources" className="text-gray-700 hover:text-green-600 font-medium">Resources</Link>
              <Link href="/blog" className="text-green-600 font-medium">Blog</Link>
              <Link href="/partnerships" className="text-gray-700 hover:text-green-600 font-medium">Partnerships</Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-green-600 font-medium">Login</Link>
              <Link href="/schedule-assessment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Request Demo
                </motion.button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back to Blog */}
        <Link href="/blog" className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Category Badge */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-600">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-xl overflow-hidden"
          >
            <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
          </motion.div>
        )}

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#section1" className="hover:text-green-600">1. Introduction to GMAX Testing</a></li>
            <li><a href="#section2" className="hover:text-green-600">2. Why GMAX Testing Matters</a></li>
            <li><a href="#section3" className="hover:text-green-600">3. Testing Standards and Requirements</a></li>
            <li><a href="#section4" className="hover:text-green-600">4. How to Schedule Testing</a></li>
            <li><a href="#section5" className="hover:text-green-600">5. Conclusion</a></li>
          </ul>
        </div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Schedule Your Field Assessment?
          </h3>
          <p className="text-green-100 mb-6">
            Get professional GMAX testing and comprehensive field health analysis.
          </p>
          <Link href="/schedule-assessment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Schedule Assessment
            </motion.button>
          </Link>
        </div>

        {/* Related Posts */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Placeholder for related posts */}
            <Link href="/blog/related-post-1" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <span className="text-sm text-green-600 font-medium">Field Safety</span>
                <h4 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-green-600">
                  How Often Should You Test Your Athletic Field?
                </h4>
                <p className="text-gray-600 text-sm">Learn about recommended testing frequencies...</p>
              </div>
            </Link>
            <Link href="/blog/related-post-2" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <span className="text-sm text-green-600 font-medium">Compliance</span>
                <h4 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-green-600">
                  Understanding ASTM F1936 Standards
                </h4>
                <p className="text-gray-600 text-sm">A complete guide to field safety standards...</p>
              </div>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Field Health Systems</h3>
              <p className="text-gray-400 text-sm">
                Professional athletic field testing and management platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/resources" className="hover:text-white">Guides</Link></li>
                <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/team" className="hover:text-white">About</Link></li>
                <li><Link href="/partnerships" className="hover:text-white">Partnerships</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Field Health Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
