import { gql } from "apollo-server";

export default gql`
    type Post{
        id: Int!
        user: User!
        userId: Int!
        file: String!
        caption: String
        createAt: String!
        updateAt:String!
    }
    
`;

