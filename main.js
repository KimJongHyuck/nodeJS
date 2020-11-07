const express = require("express");
const hbs = require('express-handlebars');
const { response, request } = require("express");
const server = express();
//const app = express();

server.engine(
  'hbs',
  hbs({
    extname:'hbs', //익스텐션 네임
    defaultLayout:'layout', //기초 레이아웃
    layoutsDir:__dirname+'/views/layouts', //레이아웃의 경로
    partialsDir:__dirname+'/views/partials' // 반복적인 html을 partiaDir에 넣어 불러와 사용
  })
);
server.set('View engine', 'hbs');


server.use(express.static(__dirname + '/public'));

server.get('/', (req,res)=> {
  // res.status(200).sendFile(__dirname + "/1.html");
  res.status(200).render('index.hbs',{name: 'amy'});
});

server.listen(3000,()=>{
  console.log("the server is running on port 3000")
});

