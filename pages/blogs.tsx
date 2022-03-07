import { gql } from "apollo-boost";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { Blog } from '@/lib/graphql-types';
import ClientOnly from "../components/clientOnly";
import Link from "next/link";
import { blogsQuery } from "@/lib/queries";

const Blogs = () => {
  const query = useQuery(blogsQuery);
  if (query.loading) return <div>loading...</div>;

  console.log(query);

  return (
    <div className="blog container">
      {query.data?.blogs.map((p: Blog, n: number) =>
        <div className="mb-10" key={n}>
          <h1 className="py-3 underline">{p.title}</h1>
          <div>
            {p.content}
          </div>
        </div>
      )}
    </div>
  )
}

const Blog: NextPage = () => {
  return (
    <div className="blog container">
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

export default Blog;