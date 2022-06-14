import bcrypt from 'bcrypt';
import client from "../../client";

export default {
    Mutation: {
        modify: async (_, {
            username,
            email,
            statement,
            password,
            intro,
            website
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: { email }
                });
                if (!existingUser) {
                    return {
                        ok: false,
                        error: e,
                    };
                }
                if (username) {
                    const existingName = await client.user.findFirst({
                        where: { username }
                    });
                    if (existingName) {
                        return {
                            ok: false,
                            error: "이미 존재하는 이름입니다.",
                        };
                    }
                }

                await client.user.update({
                    where: { email },
                    data: {
                        username,
                        statement,
                        intro,
                        website
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