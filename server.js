var http = require('http');
var fs = require('fs');
var path=require('path');
const port = 3000;
var static=fs.readdirSync('./public');
var files={}
static.forEach(function (filename) { 
	var data=fs.readFileSync(path.join('./public',filename))
	files[filename.toLowerCase()]=data;
})
var server = http.createServer(function (req, res){
	var x = req.url;
	x=x.substr(1);
	console.log(x);
	x.toLowerCase()
	if(''==x)
		x='index.html';
	var filetype;
	if (path.extname(x) == '.html')
	   filetype='text/html'
	if (path.extname(x) == '.css')
	   filetype='text/css'
	if (path.extname(x) == '.js')
	   filetype='text/javascript'
	if (path.extname(x) == '.ico')
	   filetype='text/icon'
	res.writeHead(200,{'Content-Type':filetype});
	res.write(files[x])
	res.end();
})
server.listen(3000);
console.log('Server Started listening on 3000');
console.log('index.html');