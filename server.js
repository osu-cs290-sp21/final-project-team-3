var http = require('http');
var fs = require('fs');
var path=require('path');
var PORT = process.env.PORT || 3000;
var static=fs.readdirSync('./public');
var files={}

static.forEach(function (filename) { 
	var data=fs.readFileSync(path.join('./public',filename))
	files[filename.toLowerCase()]=data;
})

fs.readFile('public/index.js', 'utf8', function(err, data){
	if(err){
		throw err
	}
})

var server = http.createServer(function (req, res){
	var x = req.url;
	x=x.substr(1);
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

})
//var port = process.env.PORT || 5000;
server.listen(PORT);
console.log('Server Started listening on ' + PORT);
