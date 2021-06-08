var http = require('http');
var fs = require('fs');
var path=require('path');
var port = process.env.PORT || 3000;
//var app;
var static=fs.readdirSync('./public');
var files={}
//app.set('port', process.env.PORT || 5000);
static.forEach(function (filename) { 
	var data=fs.readFileSync(path.join('./public',filename))
	files[filename.toLowerCase()]=data;
})
fs.readFile('public/index.js', 'utf8', function(err, data){
if(err){
throw err
}
console.log("== file contents:", data)
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
	if (path.extname(x) == '.png')
	   filetype='image/png'
	res.writeHead(200,{'Content-Type':filetype});
	res.write(files[x])
	res.end();

var responseBody="<html>"
responseBody +="<body>"
responseBody +=index.html;
responseBody +="</body>"
responseBody +="</html>"
res.statusCode=200
res.setHeader('Content-Type','text/html')
res.write(responseBody)
res.end()
})
//var port = process.env.PORT || 5000;
server.listen(3000);
console.log('Server Started listening on 3000');
