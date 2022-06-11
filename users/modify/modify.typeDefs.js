import { gql } from "apollo-server";

export default gql`
    type modifyResult {
        ok:Boolean!
        error: String
    }
    type Mutation {
        modify(
            username: String
            email: String!
            statement: String
            password: String
        ): modifyResult!
    }
`;