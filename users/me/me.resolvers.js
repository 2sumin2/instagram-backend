import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Query: {
        me: async (_, { token }) => {
            const { id } = await jwt.verify(token, process.env.SECRET_KEY);
            return client.user.findUnique({
                where: {
                    id
                },
            })
        }
    },
};