import { gql } from "apollo-server";

export default gql`
  type UnFollowResult {
        ok:Boolean!
        error:String
    }
  type Mutation {
    unfollowUser(username: String!, id: Int!): UnFollowResult!
  }
`;