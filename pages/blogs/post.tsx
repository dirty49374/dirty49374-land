import client from "@/lib/apollo-client";
import { blogsQuery, postQuery } from "@/lib/queries";
import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const BlogPostPage: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [post, { loading, error }] = useMutation(postQuery);

  const handlePost = () => {
    post({
      variables: { title, content },
      refetchQueries: [{ query: blogsQuery }],
    })
      .then(() => Router.push("/blogs"))
      .catch(e => console.error("XXX", e));
  }

  const blogEdit = (
    <>
    </>
  );

  const blogPreview = (
    <>
      <div className="prose prose-invert">
        <h2>{title}</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </>
  );

  return (
    <div className="container flex-1">
      <h1 className="h1">Post Blog</h1>
      <div className="p-1">
        <label className="block" htmlFor="title">title</label>
        <input className="input w-full" id="title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
      </div>

      <div>content</div>
      <div className="flex flex-row">

        <div className="flex-1 p-1">
          <textarea className="textarea w-full h-96" id="content" value={content} onChange={e => setContent(e.currentTarget.value)} />
        </div>

        <div className="flex-1 prose prose-invert mt-1 bg-slate-500 h-96">
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
                  >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

      </div>

      <div className="p-1">
        <p className="bg-red-600">{error?.message}</p>
      </div>
      <div className="p-1">
        <button className="btn" onClick={handlePost}>Post</button>
      </div>

    </div>

  )
};

export default BlogPostPage;