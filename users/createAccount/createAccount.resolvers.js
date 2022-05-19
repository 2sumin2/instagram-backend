import bcrypt from 'bcrypt';
import client from "../../client";

export default {
    Mutation: {
        createAccount: async (_, {
            username,
            email,
            statement,
            password,
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: { email }
                });
                if (existingUser) {
                    return {
                        ok: false,
                        error: "이미 존재하는 이메일입니다.",
                    };
                }
                const existingName = await client.user.findFirst({
                    where: { username }
                });
                if (existingName) {
                    return {
                        ok: false,
                        error: "이미 존재하는 이름입니다.",
                    };
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                await client.user.create({
                    data: {
                        username,
                        email,
                        statement,
                        password: uglyPassword,
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