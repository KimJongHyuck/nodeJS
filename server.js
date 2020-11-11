const http = require('http');
const fs = require('fs');
const url = require('url');
const app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    console.log(`쿼리 아이디:`+queryData.id);   

    //console.log(url.parse(_url, true)); // url 정보 보기 
    if(pathname === '/') {
        if(queryData.id === undefined){
            
            fs.readdir('./data/', (err, files) => {
                // console.log(files);               
            let title = 'welcome';
            let description = 'Hello, Node.js';
            let list = '<ul>';
            let i = 0;
            while(i < files.length) {
                console.log(files[i]);
                list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
                i = i+1;
            };
            list = list+'</ul>';
            let template = `
                <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
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
            fs.readdir('./data/', (err, files) => {
                // console.log(files);
            let list = '<ul>';
            let i = 0;
            while(i < files.length) {
                console.log(files[i]);
                list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
                i = i+1;
            };
            list = list+'</ul>';    

            fs.readFile(`data/${queryData.id}`,'utf8', (err, description) => {
            // if (err) throw err;
                let title = queryData.id;
                let template = `
                <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}
            </p>
            </body>
            </html>
        
            `;
                response.writeHead(200);
                response.end(template);
            });
        });
        }         
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000,()=>{
    console.log("the server is running on port 3000")
});