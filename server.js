require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from './schema';

const PORT = process.env.PORT;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs, resolvers,
    });

    await server.start();
    const app = express();

    server.applyMiddleware({ app });

    await new Promise((func) => app.listen({ port: PORT }, () => {
        console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
    }));
}
startServer();
