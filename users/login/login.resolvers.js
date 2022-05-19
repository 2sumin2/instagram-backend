import bcrypt from 'bcrypt';
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { email, password }) => {
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
                    error: "잘못된 패스워드입니다.",
                };
            }
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
        },
    }
};