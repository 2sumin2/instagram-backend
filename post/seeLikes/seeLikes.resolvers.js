import client from "../../client";

export default {
    Query: {
        seeLikes: async (_, { postId }) => {
            const ok = await client.post.findUnique({
                where: { id: postId }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Post not found",
                };
            }
            const likes = await client.post
                .findUnique({
                    where: { id: postId }
                })
                .likes({});
            const totalLikes = await likes.length;
            return {
                ok: true,
                likes,
                totalLikes
            };
        },
    },
};