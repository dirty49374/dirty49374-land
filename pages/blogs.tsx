import { gql } from "apollo-boost";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { Blog } from '@/lib/graphql-types';
import ClientOnly from "../components/clientOnly";
import Link from "next/link";
import { blogsQuery } from "@/lib/queries";
import Moment from "react-moment";
import { FC } from "react";
import BlogView from "@/components/blogView";


const Blogs = () => {
  const query = useQuery(blogsQuery);
  if (query.loading) return <div>loading...</div>;

  return (
    <>
      {query.data?.blogs.map((p: Blog, n: number) =>
        <>
          <BlogView key={n} blog={p} />
          <hr className="hr my-4 w-96 mx-auto" />
        </>
      )}
    </>
  )
}

const BlogPage: NextPage = () => {
  return (
    <div className="blog-page">
      <div className="text-right">
        <span className="btn">
          <Link href="/blogs/post">post</Link>
        </span>
      </div>
      <ClientOnly>
        <Blogs />
      </ClientOnly>
    </div>
  )
};

export default BlogPage;