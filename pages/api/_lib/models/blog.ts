import { Blog } from '@/lib/graphql-types';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const blogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
});

export const BlogModel = mongoose.models.Blog || model<Blog>('Blog', blogSchema);
