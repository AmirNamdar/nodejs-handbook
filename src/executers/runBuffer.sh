ts-node src/executers/readable/httpServerRequestBufferStreamExample.ts &
sleep 5s
curl localhost:1313 -d '{"hello": "world"}'