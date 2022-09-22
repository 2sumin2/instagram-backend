import client from "../../client";

export default {
    Query: {
        seeLikes: async (_, { postId, userId }) => {
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
            if (userId) {
                const me = await client.post
                    .findFirst({
                        where: {
                            id: postId,
                            likes:
                            {
                                some: {
                                    id: userId
                                }
                            }
                        }
                    });
                var myLike;
                if (me) {
                    myLike = true;
                } else {
                    myLike = false;
                }
            }

            return {
                ok: true,
                likes,
                totalLikes,
                myLike,
            };
        },
    },
};