// 'use client'

// import { Button } from "@/components/ui/button"
// import Typed from 'typed.js'
// import React, { useRef, useEffect } from 'react'
// import { ArrowRight, Rss } from 'lucide-react'
// import { useRouter } from "next/navigation"
// import Image from "next/image"

// export default function Home() {
//   const el = useRef(null)
//   const router = useRouter()

//   useEffect(() => {
//     const typed = new Typed(el.current, {
//       strings: ['DevOps', 'Next.js', 'MERN Stack', 'Cloud Computing', 'Containerization'],
//       typeSpeed: 50,
//       backSpeed: 50,
//       loop: true
//     })

//     return () => {
//       typed.destroy()
//     }
//   }, [])

//   // Article data with slugs for dynamic routing
//   // const featuredArticles = [
//   //   {
//   //     title: 'Mastering DevOps: A Comprehensive Guide',
//   //     description: 'Dive into the world of DevOps and learn how to streamline your development pipeline.',
//   //     imgSrc: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg',
//   //     slug: 'mastering-devops-guide',
//   //   },
//   //   {
//   //     title: 'Next.js 13: The Future of React Applications',
//   //     description: 'Explore the latest features and improvements in Next.js 13 and how they revolutionize React development.',
//   //     imgSrc: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
//   //     slug: 'nextjs-13-react-future',
//   //   },
//   //   {
//   //     title: 'Building Scalable Apps with MERN Stack',
//   //     description: 'Learn how to leverage MongoDB, Express, React, and Node.js to create powerful web applications.',
//   //     imgSrc: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
//   //     slug: 'building-scalable-mern-apps',
//   //   }
//   // ];

//   return (
//     <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
//       <section className="container px-4 py-20 mx-auto lg:min-h-screen lg:pt-32">
//         <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
//           <div className="lg:w-1/2">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
//               TechStack Chronicles
//             </h1>
//             <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
//               Exploring the world of <span className="font-semibold text-primary"><span ref={el} /></span>
//             </p>
//             <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
//               <Button onClick={() => router.push('/blogs')}>
//                 Latest Posts
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//               <Button variant="outline">
//                 Subscribe
//                 <Rss className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//           <div className="w-full mt-12 lg:mt-0 lg:w-1/2">
//             <img
//               src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
//               alt="Tech illustration"
//               className="w-full h-full max-w-md mx-auto"
//             />
//           </div>
//         </div>
//       </section>

//       {/* <section className="py-24 bg-white dark:bg-gray-800">
//         <div className="container px-4 mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Featured Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredArticles.map((article, index) => (
//               <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
//                 <img src={article.imgSrc} alt={article.title} className="w-full h-48 object-cover" />
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{article.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-4">{article.description}</p>
//                   <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => router.push(`/blogs/${article.slug}`)}
//                   >
//                     Read More
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       <section className="py-24 bg-white dark:bg-gray-800">
//         <div className="container px-4 mx-auto text-center">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Stay Updated</h2>
//           <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Subscribe to our newsletter for the latest articles and updates.</p>
//           <div className="max-w-md mx-auto">
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <Button className="rounded-l-none">
//                 Subscribe
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }





'use client'

import { Button } from "@/components/ui/button"
import Typed from 'typed.js'
import React, { useRef, useEffect } from 'react'
import { ArrowRight, Send, Rss } from 'lucide-react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from 'framer-motion'

export default function HomePage() {
  const el = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['DevOps', 'Next.js', 'MERN Stack', 'Cloud Computing', 'Containerization'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              TechStack <span className="text-blue-600">Chronicles</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Diving deep into emerging technologies. Exploring 
              <span className="font-semibold text-blue-600 ml-2">
                <span ref={el} />
              </span>
            </p>
            <div className="flex space-x-4">
              <Button 
                onClick={() => router.push('/blogs')} 
                className="group"
              >
                Latest Posts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="group">
                Subscribe
                <Rss className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <Image
                src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
                alt="Tech illustration"
                width={500}
                height={500}
                className="w-full h-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to receive cutting-edge tech insights, tutorials, and industry trends directly in your inbox.
            </p>
            <div className="flex max-w-md mx-auto space-x-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Button className="px-6 py-3 flex items-center">
                Send
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}