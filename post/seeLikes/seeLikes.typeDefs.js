import { gql } from "apollo-server";

export default gql`
  type SeeLikesResult {
    ok: Boolean!
    error: String
    likes: [User]
    totalLikes: Int
    myLike:Boolean
  }
  type Query {
    seeLikes(
        postId: Int!,
        userId: Int
        ): SeeLikesResult!
  }
`;