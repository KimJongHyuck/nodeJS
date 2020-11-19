const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

function templateHTML(title, list, body, control) {
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
}

function templateList(filelist) {
  var list = "<ul>";
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + "</ul>";
  return list;
}

const app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  console.log(`쿼리 아이디:` + queryData.id);

  //console.log(url.parse(_url, true)); // url 정보 보기
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (err, files) => {
        let title = "welcome";
        let description = "Hello, Node.js";
        let list = templateList(files);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, files) => {
        // console.log(files);
        fs.readFile(`data/${queryData.id}`, "utf8", (err, description) => {
          // if (err) throw err;
          let title = queryData.id;
          let list = templateList(files);
          let template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> 
            <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === `/create`) {
    fs.readdir("./data", (err, files) => {
      let title = "Web - create";
      let list = templateList(files);
      var template = templateHTML(
        title,
        list,
        `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        ""
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === `/create_process`) {
    let body = ``;
    request.on("data", (data) => {
      body += data;
      //Too much POST data, kill the connection
      //1e6 === 1 * math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.lenght > 1e6) request.connection.destroy();
    });
    request.on("end", () => {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;
      fs.writeFile(`data/${title}`, description, `utf-8`, (err) => {
        if (err) throw err;
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === `/update`) {
    fs.readdir("./data", (err, files) => {
      // console.log(files);
      fs.readFile(`data/${queryData.id}`, "utf8", (err, description) => {
        // if (err) throw err;
        let title = queryData.id;
        let list = templateList(files);
        let template = templateHTML(
          title,
          list,
          `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
          </form>
        `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname === `/update_process`) {
    let body = ``;
    request.on("data", (data) => {
      body += data;
      //Too much POST data, kill the connection
      //1e6 === 1 * math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.lenght > 1e6) request.connection.destroy();
    });
    request.on("end", () => {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, (err) => {
        if (err) {
          console.log(`error :` + err);
          throw err;
        }

        fs.writeFile(`data/${title}`, description, `utf-8`, (err) => {
          if (err) {
            throw err;
          }
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
