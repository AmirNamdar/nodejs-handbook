ts-node src/executers/readable/httpServerRequestStringStreamExample.ts &
sleep 5s
curl localhost:1313 -d '{"hello": "world"}'