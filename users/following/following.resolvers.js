import client from "../../client";

export default {
    Query: {
        following: async (_, { username }) => {
            const ok = await client.user.findUnique({
                where: { username },
                select: { id: true },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }

            const following = await client.user
                .findUnique({ where: { username } })
                .following({});
            const totalFollowing = await client.user.count({
                where: {
                    followers: { some: { username } }
                },
            });
            return {
                ok: true,
                following,
                totalFollowing
            };
        },
    },
};