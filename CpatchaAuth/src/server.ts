import http from "http";
import { app } from "./app";
import { port } from "./common/environment.variables";

const server: http.Server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
