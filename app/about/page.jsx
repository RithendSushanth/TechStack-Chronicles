// 'use client'

// import Image from 'next/image'
// import { motion } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function About() {
//   const journeySteps = [
//     {
//       title: "The Spark of Curiosity",
//       description: "I's coding journey began in high school when he stumbled upon Python. What started as a simple curiosity quickly turned into a passion, as he spent countless hours experimenting with code and building small projects.",
//       image: "/3.jpg"
//     },
//     {
//       title: "Diving Deeper",
//       description: "After mastering the basics, I explored more complex topics like data structures, algorithms, and web development. He enrolled in online courses and coding bootcamps, expanding his skill set and taking on freelance projects.",
//       image: "/2.jpg"
//     },
//     {
//       title: "Taking on Challenges",
//       description: "With years of experience, I tackled bigger challenges, contributing to open-source projects and developing his own applications. Each obstacle became a stepping stone to becoming the skilled developer he is today.",
//       image: "/1.jpg"
//     },
//     {
//       title: "Giving Back",
//       description: "Today, I is not only a proficient coder but also a mentor. He contributes to the programming community by writing tutorials, giving talks, and helping new coders. For I, coding is a lifelong journey of learning and sharing knowledge.",
//       image: "/4.jpg"
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
//       <section className="container mx-auto px-4 py-16 md:py-24">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="w-full md:w-1/2 mb-8 md:mb-0"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//               About <span className="text-primary">I</span>
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
//               Passionate developer, lifelong learner, and tech enthusiast
//             </p>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Hello! I'm I, a software developer dedicated to sharing knowledge and experiences in the world of programming. This blog is my platform to help others on their coding journey, whether they're just starting out or looking to sharpen their skills.
//             </p>
//             <Button>
//               Explore My Work
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="w-full md:w-1/3"
//           >
//             <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-xl">
//               <Image
//                 src="/logo.jpg"
//                 alt="I's profile"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-full"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
//             I's Coding Journey
//           </h2>
//           <Tabs defaultValue="step1" className="w-full">
//             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
//               {journeySteps.map((step, index) => (
//                 <TabsTrigger key={index} value={`step${index + 1}`}>
//                   Step {index + 1}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             {journeySteps.map((step, index) => (
//               <TabsContent key={index} value={`step${index + 1}`}>
//                 <Card>
//                   <CardContent className="flex flex-col md:flex-row items-center p-6">
//                     <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-6">
//                       <Image
//                         src={step.image}
//                         alt={step.title}
//                         width={400}
//                         height={300}
//                         className="rounded-lg shadow-md"
//                       />
//                     </div>
//                     <div className="w-full md:w-2/3">
//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
//                       <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             ))}
//           </Tabs>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 py-16 md:py-24 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
//           Let's Connect
//         </h2>
//         <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
//           Have questions or want to collaborate? Feel free to reach out!
//         </p>
//         <Button size="lg">
//           Contact Me
//           <ArrowRight className="ml-2 h-5 w-5" />
//         </Button>
//       </section>
//     </div>
//   )
// }


'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import Link from 'next/link'

export default function About() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [notification, setNotification] = useState('')

  const journeySteps = [
    {
      title: "The Spark of Curiosity",
      description: "My coding journey began in high school when i stumbled upon Python. What started as a simple curiosity quickly turned into a passion, as he spent countless hours experimenting with code and building small projects.",
      image: "/assets/about-assets/curiosity.png"
    },
    {
      title: "Diving Deeper",
      description: "After mastering the basics, I explored more complex topics like data structures, algorithms, and web development. I enrolled in online courses and coding bootcamps, expanding my skill set and taking on freelance projects.",
      image: "/assets/about-assets/technology.jpg"
    },
    {
      title: "Taking on Challenges",
      description: "With years of experience, I tackled bigger challenges, contributing to open-source projects and developing my own applications. Each obstacle became a stepping stone to becoming the skilled developer i am today.",
      image: "/assets/about-assets/challenges.png"
    },
    // {
    //   title: "Giving Back",
    //   description: "Today, I am not only a proficient coder but also a mentor. He contributes to the programming community by writing tutorials, giving talks, and helping new coders. For me, coding is a lifelong journey of learning and sharing knowledge.",
    //   image: "/assets/about-assets/giving.jpg"
    // }
  ]

  const handleContactClick = async () => {
    const email = 'rithend21@gmail.com' // Replace with your actual email
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
      setShowConfetti(true)
      setNotification('Email copied to clipboard!')
      setTimeout(() => {
        setShowConfetti(false)
        setIsCopied(false)
        setNotification('')
      }, 5000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
      setNotification('Failed to copy email. Please try again.')
    }
  }

  useEffect(() => {
    let timer
    if (notification) {
      timer = setTimeout(() => {
        setNotification('')
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [notification])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <Confetti
              width={typeof window !== 'undefined' ? window.innerWidth : 300}
              height={typeof window !== 'undefined' ? window.innerHeight : 200}
              recycle={false}
              numberOfPieces={200}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {notification && (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 mb-8 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Passionate developer, lifelong learner, and tech enthusiast
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Hello! I&apos;m Rithend, a software developer dedicated to sharing knowledge and experiences in the world of programming. This blog is my platform to help others on their coding journey, whether they&apos;re just starting out or looking to sharpen their skills.
            </p>
            <Button>
              Explore My Work
              <Link href="/blogs" className="ml-2 h-4 w-4" />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3"
          >
            <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-xl">
              <Image
                src="/assets/Pic.png"
                alt="I's profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Rithend&apos;s Coding Journey
          </h2>
          <Tabs defaultValue="step1" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {journeySteps.map((step, index) => (
                <TabsTrigger key={index} value={`step${index + 1}`}>
                  Step {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {journeySteps.map((step, index) => (
              <TabsContent key={index} value={`step${index + 1}`}>
                <Card>
                  <CardContent className="flex flex-col md:flex-row items-center p-6">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-6">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Let&apos;s Connect
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Have questions or want to collaborate? Feel free to reach out!
        </p>
        <Button size="lg" onClick={handleContactClick}>
          {isCopied ? (
            <>
              Copied!
              <Check className="ml-2 h-5 w-5 prose dark:prose-invert" />
            </>
          ) : (
            <>
              Contact Me
              <Copy className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </section>
    </div>
  )
}