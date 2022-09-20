import { gql } from "apollo-server";

export default gql`
  type SeeLikesResult {
    ok: Boolean!
    error: String
    likes: [User]
    totalLikes: Int
  }
  type Query {
    seeLikes(
        postId: Int!
        ): SeeLikesResult!
  }
`;