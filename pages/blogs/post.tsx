import client from "@/lib/apollo-client";
import { blogsQuery, postQuery } from "@/lib/queries";
import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";


const BlogWrite: NextPage = () => {
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
  return (
    <div className="container flex-1">
      <div className="blog">
        <h1 className="h1">Write Blog</h1>

        <div className="p-1">
          <label className="block" htmlFor="title">title</label>
          <input className="w-full" id="title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
        </div>

        <div className="p-1">
          <label className="block" htmlFor="content">content</label>
          <textarea className="w-full h-32" id="content" value={content} onChange={e => setContent(e.currentTarget.value)} />
        </div>

        <div className="p-1">
          <p className="bg-red-600">{error?.message}</p>
        </div>
        <div className="p-1">
          <button className="btn" onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  )
};

export default BlogWrite;