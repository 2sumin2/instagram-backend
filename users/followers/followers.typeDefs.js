import { gql } from "apollo-server";

export default gql`
  type FollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalFollowers: Int
  }
  type Query {
    followers(
        username: String!
        ): FollowersResult!
  }
`;