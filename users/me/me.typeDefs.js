import { gql } from "apollo-server";

export default gql`
  type Query {
    me(token:String): User
  }
`;