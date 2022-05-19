import { gql } from "apollo-server";

export default gql`
    type User{
        id: Int!
        username: String!
        statement: String!
        createAt: String!
        updateAt:String!
    }
    
`;
