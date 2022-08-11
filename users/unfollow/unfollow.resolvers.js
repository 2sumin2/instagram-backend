import client from "../../client";

export default {
    Mutation: {
        unfollow: (async (_, { username, id }) => {
            const ok = await client.user.findUnique({
                where: { username },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Can't unfollow user.",
                };
            }
            await client.user.update({
                where: {
                    id
                },
                data: {
                    following: {
                        disconnect: {
                            username,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        }
        ),
    },
};