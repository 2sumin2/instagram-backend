import { gql } from "apollo-server";

export default gql`
  type FollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    Followers(
        username: String!
        ): FollowersResult!
  }
`;