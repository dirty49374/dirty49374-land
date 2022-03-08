import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { BlogsDocument, BlogsQuery, BlogsQueryVariables } from "@/lib/generated/graphql";
import client from "@/lib/apollo-client";
import BlogList from "@/components/blogList";
import { parsePaginationVariables } from "@/lib/parsePaginationParams";


const BlogPage = ({ blogs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="blog-page">
      <div className="text-right">
        <span className="btn">
          <Link href="/blogs/post">post</Link>
        </span>
      </div>
      <BlogList blogs={blogs} />
    </div>
  )
};

export default BlogPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const blogsResult = await client.query<BlogsQuery, BlogsQueryVariables>({
    query: BlogsDocument,
    variables: parsePaginationVariables(context.query, 5),
  });

  return {
    props: {
      blogs: blogsResult.data.blogs
    },
  }
}
