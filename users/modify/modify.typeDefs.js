import { gql } from "apollo-server";

export default gql`
    type modifyResult {
        ok:Boolean!
        error: String
    }
    type Mutation {
        modify(
            username: String
            id: Int!
            statement: String
            password: String
            newpassword: String
            intro: String
            website: String
        ): modifyResult!
    }
`;