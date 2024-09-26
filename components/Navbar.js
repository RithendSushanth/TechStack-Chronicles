// "use client"
// import React from 'react'
// import Link from 'next/link';
// import { Button } from "@/components/ui/button"
// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet"

// import { ModeToggle } from './theme-btn';
// // import LoadingBar from 'react-top-loading-bar';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';



// const Navbar = () => {

//     const [progress, setProgress] = useState(0)
//     const pathname = usePathname()

//     useEffect(() => {
//       setProgress(20)

//       setTimeout(() => {
//         setProgress(40)
//       }, 100);

//       setTimeout(() => {
//         setProgress(100)
//       }, 400);
     
//     }, [pathname])



//     useEffect(() => {
//       setTimeout(() => {
//        setProgress(0)
//       }, 50);
//     }, [])
    
    
//     return (
//         <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
//             {/* <LoadingBar
//         color='#933ce6'
//         progress={progress}
//         onLoaderFinished={() => setProgress(0)}
//       /> */}
//             <div className="container mx-auto flex justify-between items-center">
//                 <Link href={"/"}><div className="text-lg font-bold">
//                     Rithend Blogs
//                 </div></Link>
//                 <div className="hidden md:flex space-x-4 items-center">
//                     <Link href="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300"> Home
//                     </Link>
//                     <Link href="/about" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
//                         About
//                     </Link>
//                     <Link href="/blog" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
//                         Blog
//                     </Link>
//                     <Link href="/contact" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
//                         Contact
//                     </Link>
//                     <div className='flex items-center'>
//                         <Button className="mx-1" variant="outline">Login</Button>
//                         <Button className="mx-1" variant="outline">Signup</Button>
//                         <ModeToggle />
//                     </div>
//                 </div>

//                 <div className="md:hidden">
//                         <span className="mx-2"> 
//                             <ModeToggle />
//                         </span>
//                     <Sheet>
//                         <SheetTrigger>
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//                             </svg>
//                         </SheetTrigger>
//                         <SheetContent>
//                             <SheetHeader>
//                                 <SheetTitle className="font-bold my-4">HarryBlog</SheetTitle>
//                                 <SheetDescription>
//                                     <div className="flex flex-col gap-6">
//                                         <Link href="/"> Home
//                                         </Link>
//                                         <Link href="/about">
//                                             About
//                                         </Link>
//                                         <Link href="/blog">
//                                             Blog
//                                         </Link>
//                                         <Link href="/contact">
//                                             Contact
//                                         </Link>
//                                         <div>
//                                             <Button className="mx-1 text-xs" variant="outline">Login</Button>
//                                             <Button className="mx-1 text-xs" variant="outline">Signup</Button>

//                                         </div>

//                                     </div>
//                                 </SheetDescription>
//                             </SheetHeader>
//                         </SheetContent>
//                     </Sheet>

//                 </div>


//             </div>



//         </nav>
//     );
// };

// export default Navbar




'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from './theme-btn'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              TechStack Chronicles
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <Button size="sm">Sign up</Button>
            </div> */}
            <ModeToggle />
          </div>
          <div className="flex md:hidden">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                  <SheetDescription asChild>
                    <div className="flex flex-col space-y-4 mt-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`text-sm font-medium transition-colors hover:text-primary ${
                            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {/* <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          Log in
                        </Button>
                        <Button size="sm">Sign up</Button>
                      </div> */}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar