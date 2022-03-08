import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { GetBlogsDocument, GetBlogsQuery, GetBlogsQueryVariables } from "@/lib/generated/graphql";
import client from "@/lib/apollo-client";
import BlogList from "@/components/blogList";
import { parsePaginationVariables } from "@/lib/parsePaginationParams";


const BlogPage = ({ getBlogsResult }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="blog-page">
      <div className="text-right">
        <span className="btn">
          <Link href="/blogs/post">post</Link>
        </span>
      </div>
      <BlogList getBlogsResult={getBlogsResult} />
    </div>
  )
};

export default BlogPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const getBlogsResult = await client.query<GetBlogsQuery, GetBlogsQueryVariables>({
    query: GetBlogsDocument,
    variables: parsePaginationVariables(context.query, 5),
  });

  return {
    props: {
      getBlogsResult
    },
  }
}
