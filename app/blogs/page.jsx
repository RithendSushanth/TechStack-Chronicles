// import React from 'react';  
// import { buttonVariants } from '@/components/ui/button';
// import Link from 'next/link';
// import fs from "fs";
// import matter from 'gray-matter';


// const dirContent = fs.readdirSync("content", "utf-8")

// const blogs = dirContent.map(file=>{
//     const fileContent = fs.readFileSync(`content/${file}`, "utf-8")
//     const {data} = matter(fileContent)
//     return data
// })


// // const blogs = [
// //   {
// //     title: 'First Blog',
// //     description: 'This is the first blog description.',
// //     slug: 'first-blog',
// //     date: '2023-10-01',
// //     author: 'John Doe',
// //     image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
// //   },
// //   {
// //     title: 'Second Blog',
// //     description: 'This is the second blog description.',
// //     slug: 'second-blog',
// //     date: '2023-10-02',
// //     author: 'Jane Doe',
// //     image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
// //   },
// //   {
// //     title: 'Second Blog',
// //     description: 'This is the second blog description.',
// //     slug: 'second-blog',
// //     date: '2023-10-02',
// //     author: 'Jane Doe',
// //     image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg'
// //   },
// //   // Add more blog objects here
// // ];

// /**
//  * Blog component that renders a list of blog posts.
//  * Each blog post includes an image, title, description, author, date, and a link to the full post.
//  * 
//  * @returns {JSX.Element} The rendered blog component.
//  */
// const Blog = () => {
//   return (
//     <div className="container mx-auto p-4">
//       {/* Main heading for the blog section */}
//       <h1 className="text-4xl font-bold mb-8 text-center">Blogs</h1>
      
//       {/* Grid layout for blog posts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogs.map((blog, index) => (
//           <div key={index} className="rounded-lg shadow-md overflow-hidden  dark:border-2">
//             {/* Blog post image */}
//             <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
            
//             {/* Blog post content */}
//             <div className="p-4">
//               {/* Blog post title */}
//               <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              
//               {/* Blog post description */}
//               <p className=" mb-4">{blog.description}</p>
              
//               {/* Blog post author and date */}
//               <div className="text-sm  mb-4">
//                 <span>By {blog.author}</span> | <span>{new Date(blog.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
//               </div>
              
//               {/* Link to the full blog post */}
//               <Link href={`/blogpost/${blog.slug}`} className={buttonVariants({ variant: "outline" })}>Click here</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Blog;




import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, UserIcon } from 'lucide-react'
import fs from "fs"
import matter from 'gray-matter'

const dirContent = fs.readdirSync("content", "utf-8")

const blogs = dirContent.map(file => {
  const fileContent = fs.readFileSync(`content/${file}`, "utf-8")
  const { data } = matter(fileContent)
  return data
})

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest <span className="text-primary">Insights</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <Image
                src={blog.image}
                alt={blog.title}
                layout="fill"
                object-fit= "cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-4">{blog.description}</p>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{new Date(blog.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                href={`/blogpost/${blog.slug}`} 
                className={buttonVariants({ variant: "outline", className: "w-full" })}
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
