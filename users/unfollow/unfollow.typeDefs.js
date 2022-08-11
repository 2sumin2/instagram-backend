import { gql } from "apollo-server";

export default gql`
  type UnFollowResult {
        ok:Boolean!
        error:String
    }
  type Mutation {
    unfollow(
      myname: String!, 
      othername: String!
      ): UnFollowResult!
  }
`;