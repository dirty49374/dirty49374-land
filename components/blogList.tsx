import { BlogsQuery } from "@/lib/generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import BlogView from "./blogView";

type BlogListProps = {
  blogs: ApolloQueryResult<BlogsQuery>['data']['blogs'];
}

const BlogList = ({ blogs }: BlogListProps) => {
  const router = useRouter();
  const { page } = router.query;
  const pageNo = parseInt(page as any || '1');

  const PrevPage = () => {
    if (pageNo === 1) {
      return <></>;
    }
    if (pageNo === 2) {
      return <Link href='/blogs'>&lt;&lt; PREV</Link>;
    }
    return <Link href={`/blogs?page=${pageNo - 1}&before=${blogs.edges[0]?.cursor}`}>&lt;&lt; PREV</Link>;
  }

  const NextPage = () => {
    if (blogs?.pageInfo.hasNextPage) {
      return <Link href={`/blogs?page=${pageNo + 1}&after=${blogs.edges[blogs.edges.length - 1]?.cursor}`}>NEXT &gt;&gt;</Link>;
    }
    return <></>;
  }

  return (
    <>
      {blogs?.edges?.map((e, n) =>
        <Fragment key={n}>
          <BlogView blog={e.node} />
          <hr className="hr my-4 w-96 mx-auto" />
        </Fragment>
      )}
      {PrevPage()} &nbsp; {NextPage()}
    </>
  )
}

export default BlogList;
