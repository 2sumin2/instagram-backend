import bcrypt from 'bcrypt';
import client from "../../client";

export default {
    Mutation: {
        modify: async (_, {
            username,
            email,
            statement,
            password,
            newpassword,
            intro,
            website,
            image
        }) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: { email }
                });
                if (!existingUser) {
                    return {
                        ok: false,
                        error: "사용자가 존재하지 않습니다.",
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
                if (password) {
                    const user = await client.user.findFirst({ where: { email } });
                    if (!user) {
                        return {
                            ok: false,
                            error: "사용자를 찾을 수 없습니다.",
                        };
                    }
                    const passwordOk = await bcrypt.compare(password, user.password);
                    if (!passwordOk) {
                        return {
                            ok: false,
                            error: "현재 비밀번호가 일치하지 않습니다.",
                        };
                    }
                    const uglyPassword = await bcrypt.hash(newpassword, 10);
                    await client.user.update({
                        where: { email },
                        data: {
                            password: uglyPassword,
                        },
                    });
                    return {
                        ok: true,
                    };
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