import { gql } from "apollo-server";

export default gql`
  type SeePostsResult {
    ok: Boolean!
    error: String
    posts: [Post]
    totalPosts: Int
  }
  type Query {
    seePosts(
        userId: Int!
        ): SeePostsResult!
  }
`;