const http = require('http');
const fs = require('fs');
const url = require('url');
const app = http.createServer(function(request,response){
    let _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    console.log(`쿼리 ㅏ이디:`+queryData.id);   
    let title = queryData.id;

    console.log(url.parse(_url, true)); // url 정보 보기 
    if(pathname === '/'){
    fs.readFile(`data/${queryData.id}`,'utf8', (err, description) => {
        // if (err) throw err;
        let template = `
            <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=javaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}
        </p>
        </body>
        </html>
    
        `;
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000,()=>{
    console.log("the server is running on port 3000")
});