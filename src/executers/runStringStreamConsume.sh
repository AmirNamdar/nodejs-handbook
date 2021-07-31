ts-node src/executers/readable/httpServerRequestBufferStringConsumeExample.ts &
sleep 5s
curl localhost:1313 -d '{"hello": "world"}'