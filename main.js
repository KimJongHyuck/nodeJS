const http = require('http');
const fs = require('fs');

const server = http.createServer((request,response) => {
  console.log(request.url);
  console.log(request.method);

  fs.readFile("./index.html", null, (err,data) => {
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(data);
    response.end();
  }) // 파일 위치, 텍스트타입, 콜백함수

});

server.listen(3000);