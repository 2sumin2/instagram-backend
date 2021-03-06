import { gql } from "apollo-server";

export default gql`
    type createAccountResult {
        ok:Boolean!
        error: String
    }
    type Mutation {
        createAccount(
            username: String!
            email: String!
            statement: String!
            password: String!
        ): createAccountResult!
    }
`;