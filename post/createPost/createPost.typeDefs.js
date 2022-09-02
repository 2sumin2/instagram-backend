import { gql } from "apollo-server";

export default gql`
    type createPostResult {
        ok:Boolean!
        error: String
    }
    type Mutation {
        createPost(
            userId: Int!
            file: String!
            caption: String
        ): createPostResult!
    }
`;