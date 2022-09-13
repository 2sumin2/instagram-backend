require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from './schema';

const PORT = process.env.PORT;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs, resolvers,
    });

    await server.start();
    const app = express();

    app.post('/upload', (req, res, next) => {

        try {

            const data = JSON.parse(req.body.datas);
            let imageFile = req.files;

            // ipfs.add 를 통해 ipfs 서버에 업로드 한다. path 는 키고 content가 실제 이미지 파일. buffer 나 arraybuffer 로 넘겨야 한다.
            ipfs.add({ path: imageFile.name, content: imageFile.data }, async (err, ipfsHash) => {
                if (err) {
                    console.log('err', err);
                    return res.status(501).json({ message: err });
                }

                let imageKey = ipfsHash[0].hash + path.extname(imageFile.name);


                // ipfs 업로드 후 그 해쉬를 파일명으로 해서 s3에 업로드
                const params = {
                    Bucket: S3_BUCKET,
                    Key: imageKey,
                    Body: imageFile.data,
                    ACL: 'public-read', // 이거 안해주면 버킷이 퍼블릭이어도 안보임
                    ContentType: imageFile.mimetype
                };

                await s3.upload(params, async function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    imageFile.url = data;

                });

                imageFile.hash = ipfsHash[0].hash;

                // 메타데이터 정의
                const metadata = {
                    attributes: [

                        {
                            "trait_type": "MINING",
                            "value": "20"
                        },

                    ],
                    name: "--",
                    key: imageKey,
                    description: "---",
                    image: 'https://ipfs.io/ipfs/' + imageFile.hash,
                    external_url: S3_URI + 'nft-files/' + imageKey
                }

                const src = Readable.from(JSON.stringify(metadata));
                await ipfs.add({
                    path: 'metadata.json',
                    content: src
                }, async (err, hash) => {
                    if (err) {
                        console.log('err', err);
                    }

                });

            });

        } catch (e) {
            console.error(e);
            res.status(500).json({ result: -100, data: null, err: "서버 에러입니다." });
        }

    });


    server.applyMiddleware({ app });

    await new Promise((func) => app.listen({ port: PORT }, () => {
        console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
    }));
}
startServer();


/*

app.post('/upload', (req, res) => {
        const file = req.files.file;
        const fileName = req.body.fileName;
        const filePath = 'files/' + fileName;

        file.mv(filePath, async (err) => {
            if (err) {
                console.error('Error : filed to download the file');
                return res.status(500).send(err);
            }
            const fileHash = await addFile(fileName, filePath);
            fs.unlink(filePath, (err) => {
                if (err) console.err(err);
            })
            res.render('upload', { fileName, fileHash });
        })
    });
*/