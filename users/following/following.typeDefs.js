import { gql } from "apollo-server";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalFollowing: Int
  }
  type Query {
    following(
        username: String!): SeeFollowingResult!
  }
`;