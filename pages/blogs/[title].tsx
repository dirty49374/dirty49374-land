import BlogView from "@/components/blogView";
import client from "@/lib/apollo-client";
import { BlogDocument, BlogQuery, BlogQueryVariables } from "@/lib/generated/graphql";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

function BlogByTitlePage({ blog }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { title } = router.query;

  return (
    <div className="blog-page">
      <BlogView blog={blog} />
    </div>
  );
}

export default BlogByTitlePage;


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { title } = context.query;

  const realTitle = (title + '').replace(/--/g, ' ');

  const blogResult = await client.query<BlogQuery, BlogQueryVariables>({
    query: BlogDocument,
    variables: { title: realTitle }
  });

  if (!blogResult.data.blog) {
    console.log('notfound')
    return { notFound: true };
  }

  return {
    props: {
      blog: blogResult.data.blog
    },
  }
}
