const express = require("express");
const { response, request } = require("express");
const server = express();
//const app = express();

server.use(express.static(__dirname + '/public'));

server.get('/', (req,res)=> {
  res.status(200).sendFile(__dirname + "/1.html");
})

server.listen(3000,()=>{
  console.log("the server is running on port 3000")
});

