import client from "../../client";

export default {
    Mutation: {
        toggleLike: async (_, { postId, userId }) => {
            const ok = await client.post.findUnique({
                where: { id: postId }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Post not found",
                };
            }
            const like = await client.post
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
            if (like) {
                await client.post
                    .update({
                        where: {
                            id: postId,
                        },
                        data: {
                            likes:
                            {
                                disconnect: {
                                    id: userId
                                }
                            }
                        }
                    });

            } else {
                await client.post
                    .update({
                        where: {
                            id: postId,
                        },
                        data: {
                            likes:
                            {
                                set: {
                                    id: userId
                                }
                            }
                        }
                    });

            }
            return {
                ok: true,
            };
        },
    },
};