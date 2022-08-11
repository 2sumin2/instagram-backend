import client from "../../client";

export default {
    Mutation: {
        unfollow: (async (_, { myname, othername }) => {
            const ok = await client.user.findUnique({
                where: { username: othername },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Can't unfollow user.",
                };
            }
            await client.user.update({
                where: {
                    username: myname
                },
                data: {
                    following: {
                        disconnect: {
                            username: othername,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        }
        ),
    },
};