import client from "../../client";

export default {
    Mutation: {
        follow: (async (_, { othername, myname }) => {
            const ok = await client.user.findUnique({
                where: {
                    username: othername
                }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "That user does not exist.",
                };
            }
            await client.user.update({
                where: {
                    username: myname,
                },
                data: {
                    following: {
                        connect: {
                            username: othername,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        }),
    },
};