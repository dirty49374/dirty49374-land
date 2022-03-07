import { gql } from "@apollo/client";

export const blogsQuery = gql`
  {
    blogs {
      id
      title
      content
    }
  }
`;

export const postQuery = gql`
  mutation($title: String, $content: String) {
    postBlog(title: $title, content: $content) {
      id
    }
  }
`;

