import client from "../../client";

export default {
    Query: {
        search: async (_, { keyword }) => {
            return client.user.findMany({
                where: {
                    OR: [
                        {
                            username: {
                                startsWith: keyword
                            }
                        }
                    ]

                },
            })
        }
    },
};