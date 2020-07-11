let http = require("http");
let readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//import "http";
console.log("Marcellotto sei un porcottooooooo!");
let server = http.createServer(function(req,res){
    let myMsg = "";
    req.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
    });
    myMsg = "taaaaaaaaaac" + req.url;
    res.statusCode = "200";
    res.statusMessage = "OK";
    res.end(myMsg);
    console.log("Ziocagnone");
});
server.listen(8080);
rl.on('line', (input) => {
    firstRead = false;
    //console.log(`Received: ${input}`);    
    if (input == 'close'){
        server.close();   
        console.log("Server closed");
        process.exit();
    }         
});