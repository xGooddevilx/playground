import fs from "fs";
import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  // 1)

  //   fs.readFile("utf-8", data => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // 2)

  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", data => {
  //     res.write(data);
  //   });

  //   readable.on("error", () => {
  //     res.statusCode = 500;
  //     res.end("Failed");
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   3 )

  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
});

server.listen(8000, () => {
  console.log("Server is listening ...");
});
