import bcrypt from 'bcrypt';
import client from "../../client";

export default {
    Mutation: {
        createPost: async (_, {
            userId,
            file,
            caption,
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: { id: userId }
                });
                if (!existingUser) {
                    return {
                        ok: false,
                        error: "사용자를 확인할 수 없습니다.",
                    };
                }
                await client.post.create({
                    data: {
                        userId,
                        username: existingUser.username,
                        file,
                        caption,
                    },
                });
                return {
                    ok: true,
                };
            } catch (e) {
                return {
                    ok: false,
                    error: e,
                };
            }
        },
    }
};