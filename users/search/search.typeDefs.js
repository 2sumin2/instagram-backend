import { gql } from "apollo-server";

export default gql`
  type Query {
    search(keyword:String): [User]
  }
`;