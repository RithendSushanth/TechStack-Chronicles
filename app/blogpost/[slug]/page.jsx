

// import fs from "fs";
// import matter from "gray-matter";
// import { notFound } from "next/navigation";
// import rehypeDocument from 'rehype-document';
// import rehypeFormat from 'rehype-format';
// import rehypeStringify from 'rehype-stringify';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import { unified } from 'unified';
// import rehypePrettyCode from "rehype-pretty-code";
// import { transformerCopyButton } from '@rehype-pretty/transformers';
// import OnThisPage from "@/components/onthispage";
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypeSlug from 'rehype-slug';
// import { CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';

// // Add the following line to specify Edge Runtime
// export const runtime = 'edge';

// export default async function Page({ params }) {
//     const filepath = `content/${params.slug}.md`;
    
//     if (!fs.existsSync(filepath)) { 
//         notFound(); 
//         return; 
//     } 

//     const fileContent = fs.readFileSync(filepath, "utf-8");
//     const { content, data } = matter(fileContent);

//     const processor = unified()
//         .use(remarkParse)
//         .use(remarkRehype)
//         .use(rehypeDocument, { title: data.title })
//         .use(rehypeFormat)
//         .use(rehypeStringify) 
//         .use(rehypeSlug)
//         .use(rehypeAutolinkHeadings)
//         .use(rehypePrettyCode, {
//             theme: "github-dark",
//             transformers: [
//                 transformerCopyButton({
//                     visibility: 'always',
//                     feedbackDuration: 3_000,
//                 }),
//             ],
//         });

//     const htmlContent = (await processor.process(content)).toString();

//     // Estimate read time (assuming 200 words per minute)
//     const wordCount = content.split(/\s+/).length;
//     const readTime = Math.ceil(wordCount / 200);

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-12 lg:flex lg:gap-12">
//             <article className="lg:w-2/3">
//                 <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{data.title}</h1>
//                 <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 border-l-4 border-primary pl-4 italic">
//                     &quot;{data.description}&quot;
//                 </p>
//                 <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
//                     <div className="flex items-center">
//                         <UserIcon className="w-4 h-4 mr-2" />
//                         <span>{data.author}</span>
//                     </div>
//                     <div className="flex items-center">
//                         <CalendarIcon className="w-4 h-4 mr-2" />
//                         <span>{new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
//                     </div>
//                     <div className="flex items-center">
//                         <ClockIcon className="w-4 h-4 mr-2" />
//                         <span>{readTime} min read</span>
//                     </div>
//                 </div>
//                 <div 
//                     dangerouslySetInnerHTML={{ __html: htmlContent }} 
//                     className="prose prose-lg dark:prose-invert max-w-none"
//                 />
//             </article>
//             <aside className="lg:w-1/3 mt-12 lg:mt-0">
//                 <div className="sticky top-24">
//                     <OnThisPage htmlContent={htmlContent} />
//                 </div>
//             </aside>
//         </div>
//     );
// }




import fs from "fs";
import matter from "gray-matter";
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import OnThisPage from "@/components/onthispage";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
    const files = fs.readdirSync('content');
    const paths = files.map((file) => ({
        slug: file.replace('.md', ''),
    }));

    return paths; // Return an array of parameters for each post
}

// Page component for individual blog posts
export default async function Page({ params }) {
    const filepath = `content/${params.slug}.md`;

    // Check if the file exists
    if (!fs.existsSync(filepath)) {
        throw new Error("Not Found"); // Handle 404 here
    }

    const fileContent = fs.readFileSync(filepath, "utf-8");
    const { content, data } = matter(fileContent);

    // Process the markdown content
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, { title: data.title })
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
        });

    const htmlContent = (await processor.process(content)).toString();

    // Estimate read time (assuming 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

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
    );
}
