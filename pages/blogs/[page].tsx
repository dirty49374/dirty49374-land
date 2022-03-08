import { useRouter } from "next/router";

function BlogPage() {
  const router = useRouter();
  const { page } = router.query;

  return (
    <div>XXX{page}</div>
  );
}

export default BlogPage;
