// "use client"
// import React, { useEffect, useState } from 'react';
// import parse from 'html-react-parser';

// const OnThisPage = ({ htmlContent }) => {
//   const [headings, setHeadings] = useState([]);

//   useEffect(() => {
//     // Parse the HTML content and extract h2 headings
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlContent;
//     const h2Elements = tempDiv.querySelectorAll('h2');
//     const h2Data = Array.from(h2Elements).map(h2 => ({
//       text: h2.textContent,
//       id: h2.id
//     }));
//     setHeadings(h2Data);
//   }, [htmlContent]);

//   return (
//     <div className="on-this-page absolute top-24 md:right-48 lg:right-1/4 hidden lg:block">
//       <h2 className='text-md font-bold my-2'>On This Page</h2>
//       <ul className='text-sm space-y-1'>
//         {headings.map((heading, index) => (
//           <li key={index}>
//             <a href={`#${heading.id}`}>{heading.text}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OnThisPage;




// 'use client'

// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'

// const OnThisPage = ({ htmlContent }) => {
//   const [headings, setHeadings] = useState([])
//   const [activeId, setActiveId] = useState('')

//   useEffect(() => {
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(htmlContent, 'text/html')
//     const headingElements = doc.querySelectorAll('h2, h3')
//     const headingData = Array.from(headingElements).map(heading => ({
//       text: heading.textContent,
//       id: heading.id,
//       level: parseInt(heading.tagName.charAt(1))
//     }))
//     setHeadings(headingData)

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveId(entry.target.id)
//           }
//         })
//       },
//       { rootMargin: '-20% 0% -35% 0%' }
//     )

//     headingElements.forEach(heading => {
//       const element = document.getElementById(heading.id)
//       if (element) observer.observe(element)
//     })

//     return () => observer.disconnect()
//   }, [htmlContent])

//   const handleClick = (id) => {
//     const element = document.getElementById(id)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   return (
//     <nav className="hidden lg:block sticky top-24 ml-8 w-64">
//       <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">On This Page</h2>
//       <ul className="space-y-2">
//         {headings.map((heading, index) => (
//           <motion.li
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className={`${heading.level === 3 ? 'ml-4' : ''}`}
//           >
//             <button
//               onClick={() => handleClick(heading.id)}
//               className={`text-sm hover:text-primary transition-colors duration-200 ${
//                 activeId === heading.id
//                   ? 'text-primary font-medium'
//                   : 'text-gray-600 dark:text-gray-300'
//               }`}
//             >
//               {heading.text}
//             </button>
//           </motion.li>
//         ))}
//       </ul>
//     </nav>
//   )
// }

// export default OnThisPage



'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    const headingElements = doc.querySelectorAll('h2, h3')
    const headingData = Array.from(headingElements).map((heading, index) => ({
      text: heading.textContent,
      id: `heading-${index}`,
      level: parseInt(heading.tagName.charAt(1))
    }))
    setHeadings(headingData)

    // Apply IDs to actual DOM elements
    const actualHeadings = document.querySelectorAll('h2, h3')
    actualHeadings.forEach((heading, index) => {
      heading.id = `heading-${index}`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    actualHeadings.forEach(heading => observer.observe(heading))

    return () => observer.disconnect()
  }, [htmlContent])

  const handleClick = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // Adjust this value based on your layout
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav className="hidden lg:block sticky top-24 ml-8 w-64 max-h-[calc(100vh-6rem)] overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">On This Page</h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${heading.level === 3 ? 'ml-4' : ''} relative`}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-sm hover:text-primary transition-colors duration-200 flex items-center ${
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <ChevronRight 
                className={`mr-2 h-4 w-4 transition-opacity duration-200 ${
                  activeId === heading.id ? 'opacity-100' : 'opacity-0'
                }`} 
              />
              {heading.text}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}

export default OnThisPage