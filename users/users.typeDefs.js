import { gql } from "apollo-server";

export default gql`
    type User{
        id: Int!
        email: String!
        username: String!
        statement: String!
        createAt: String!
        updateAt:String!
    }
    
`;
