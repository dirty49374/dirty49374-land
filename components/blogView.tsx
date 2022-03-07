import { Blog } from "@/lib/graphql-types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import Moment from "react-moment";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type BlogViewProps = {
  blog: Blog;
}

const BlogView: FC<BlogViewProps> = ({ blog }) => {
  return (
    <>
      <h1 className="h1 py-3 underline">{blog.title}</h1>
      <article className="prose prose-invert mb-10">
        <div className="py-1">
          <Moment className="text-xs" format="YYYY/MM/DD HH:MI:SS" date={blog.publishedAt} />
        </div>
        <div className="py-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    // style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >{String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}

export default BlogView;
