// import fs from "fs"
// import matter from "gray-matter"
// import { notFound } from "next/navigation"
// import rehypeDocument from 'rehype-document'
// import rehypeFormat from 'rehype-format'
// import rehypeStringify from 'rehype-stringify'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import {unified} from 'unified'
// import rehypePrettyCode from "rehype-pretty-code";
// import { transformerCopyButton } from '@rehype-pretty/transformers'
// import OnThisPage from "@/components/onthispage"
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeSlug from 'rehype-slug'

// export default async function Page({ params }) {

//     // const blog = {
//     //     title: "Typescript tutorial in hindi",
//     //     author: "John Doe",
//     //     description: "This is a sample blog post description.",
//     //     date: "2024-09-02",
//     //     content: "<p>This is the content of the blog post. It can include <strong>HTML</strong> tags and other elements.</p>"
//     // };

//     const filepath = `content/${params.slug}.md`
    
//     if(!fs.existsSync(filepath)){ 
//         notFound() 
//         return 
//     } 

//     const fileContent = fs.readFileSync(filepath, "utf-8")
//     const {content, data} = matter(fileContent)

//     const processor = unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, {title: '👋🌍'})
//     .use(rehypeFormat)
//     .use(rehypeStringify) 
//     .use(rehypeSlug)
//     .use(rehypeAutolinkHeadings)
//     .use(rehypePrettyCode, {
//         theme: "github-dark",
//         transformers: [
//             transformerCopyButton({
//               visibility: 'always',
//               feedbackDuration: 3_000,
//             }),
//           ],

//       })

//     const htmlContent = (await processor.process(content)).toString()


//     return (
//         <div className="max-w-6xl mx-auto p-4">
//             <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
//             <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">&quot;{data.description}&quot;</p>
//             <div className="flex gap-2">
//                 <p className="text-sm text-gray-500 mb-4 italic">By {data.author}</p>
//                 <p className="text-sm text-gray-500 mb-4">{data.date}</p>
//             </div>
//             <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose dark:prose-invert"></div>
//             <OnThisPage htmlContent={htmlContent}/>
//         </div>
//     )
// }


import fs from "fs"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import rehypePrettyCode from "rehype-pretty-code"
import { transformerCopyButton } from '@rehype-pretty/transformers'
import OnThisPage from "@/components/onthispage"
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { CalendarIcon, UserIcon, ClockIcon } from 'lucide-react'

export default async function Page({ params }) {
    const filepath = `content/${params.slug}.md`
    
    if(!fs.existsSync(filepath)){ 
        notFound() 
        return 
    } 

    const fileContent = fs.readFileSync(filepath, "utf-8")
    const {content, data} = matter(fileContent)

    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, {title: data.title})
        .use(rehypeFormat)
        .use(rehypeStringify) 
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode, {
            theme: "github-dark",
            transformers: [
                transformerCopyButton({
                  visibility: 'always',
                  feedbackDuration: 3_000,
                }),
            ],
        })

    const htmlContent = (await processor.process(content)).toString()

    // Estimate read time (assuming 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:flex lg:gap-12">
            <article className="lg:w-2/3">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{data.title}</h1>
                <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 border-l-4 border-primary pl-4 italic">
                    &quot;{data.description}&quot;
                </p>
                <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span>{data.author}</span>
                    </div>
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        <span>{readTime} min read</span>
                    </div>
                </div>
                <div 
                    dangerouslySetInnerHTML={{ __html: htmlContent }} 
                    className="prose prose-lg dark:prose-invert max-w-none"
                />
            </article>
            <aside className="lg:w-1/3 mt-12 lg:mt-0">
                <div className="sticky top-24">
                    <OnThisPage htmlContent={htmlContent} />
                </div>
            </aside>
        </div>
    )
}