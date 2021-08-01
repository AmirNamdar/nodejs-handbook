ts-node src/executers/general/httpServerRequestBufferStreamConsumeExample.ts &
sleep 5s
curl localhost:1313 -d '{"hello": "world"}'