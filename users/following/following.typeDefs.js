import { gql } from "apollo-server";

export default gql`
  type FollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    following(
        username: String!, 
        lastId: Int
        ): FollowingResult!
  }
`;