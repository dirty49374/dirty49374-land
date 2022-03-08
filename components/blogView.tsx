import { FC, useState } from "react";
import Moment from "react-moment";
import { Blog, useDislikeBlogMutation, useLikeBlogMutation, usePostCommentMutation } from "@/lib/generated/graphql";
import { ReplyIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import MarkdownView from "./markdownView";
import FlatIconButton from "./flatIconButton";
import Link from "next/link";
import { defaultTimeFormat } from "@/lib/const";

type CommentFormProps = {
  blogId: string;
};

const CommentForm: FC<CommentFormProps> = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const [postComment] = usePostCommentMutation();

  const handlePost = () => {
    if (!comment) return;
    postComment({ variables: { blogId, comment } })
  }
  return (
    <div>
      <input className="input w-96" value={comment} onChange={e => setComment(e.currentTarget.value)} />
      <FlatIconButton Icon={ReplyIcon} onClick={() => handlePost()}></FlatIconButton>
    </div>
  )
}

type BlogViewProps = {
  blog: Blog;
}

const BlogView: FC<BlogViewProps> = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [dislikes, setDislikes] = useState(blog.dislikes || 0);

  const [doLike, { loading: likeing }] = useLikeBlogMutation();
  const [doDislike, { loading: dislikeing }] = useDislikeBlogMutation();

  const handleLike = () =>
    doLike({ variables: { id: blog.id! } })
      .then(r => setLikes(likes + 1));
  const handleDiskike = () =>
    doDislike({ variables: { id: blog.id! } })
      .then(r => setDislikes(dislikes + 1));

  return (
    <article className="prose prose-invert mb-10">
      <h1 className="h1 py-3">
        <Link href={`/blogs/${blog.title?.replaceAll(' ', '--')}`}>{blog.title}</Link>
      </h1>

      <Moment className="text-xs" format={defaultTimeFormat} date={blog.publishedAt} />

      <MarkdownView className="py-3" content={blog.content} />

      <div>
        <FlatIconButton Icon={ThumbUpIcon} loading={likeing} onClick={() => handleLike()} /> {likes}
        <FlatIconButton Icon={ThumbDownIcon} loading={dislikeing} onClick={() => handleDiskike()} /> {dislikes}
      </div>

      <div>
        {blog.comments?.nodes?.map(c =>
          <div key={c.id} className="flex flex-row items-center p-2">
            <div className="rounded-full bg-white text-black w-6 h-6 mr-2">
            </div>
            <div className="flex-1">
              {c.comment}
            </div>
            <div className="w-48">
              <Moment className="text-xs" format={defaultTimeFormat}>{c.publishedAt}</Moment>
            </div>
          </div>
        )}
      </div>
      <div>
        <CommentForm blogId={blog.id!} />
      </div>

    </article>
  );
}

export default BlogView;
