import client from "../../client";

export default {
    Query: {
        search: async (_, { keyword }) => {
            try {
                const users = await client.user.findMany({
                    where: {
                        OR: [
                            {
                                username: {
                                    startsWith: keyword
                                }
                            }
                        ]

                    },
                });
                const count = users.length
                return {
                    ok: true,
                    users,
                    count
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e
                }
            }

        }
    },
};