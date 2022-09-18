import client from "../../client";

export default {
    Query: {
        seePosts: async (_, { userId }) => {
            try {
                if (userId) {
                    const ok = await client.user.findUnique({
                        where: { id: userId },
                        select: { id: true },
                    });
                    if (!ok) {
                        return {
                            ok: false,
                            error: "User not found",
                        };
                    }
                    const posts = await client.user
                        .findUnique({
                            where: { id: userId }
                        })
                        .post({});
                    const totalPosts = await client.post.count({
                        where: {
                            userId
                        }
                    });
                    return {
                        ok: true,
                        posts,
                        totalPosts
                    };
                } else {
                    const posts = await client.post.findMany({
                        orderBy: {
                            createdAt: 'asc'
                        }
                    }
                    );
                    const totalPosts = await client.post.count({});
                    return {
                        ok: true,
                        posts,
                        totalPosts
                    };
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e
                }
            }
        },
    },
};