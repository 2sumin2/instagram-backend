import { gql } from "apollo-server";

export default gql`
  type SearchResult {
    ok: Boolean!
    error: String
    users: [User]
    count: Int
  }
  type Query {
    search(keyword:String): SearchResult!
  }
`;