var request = require('request');
var fs = require("fs");
var options = {
    url: 'https://api.github.com/repos/racaljk/hosts',
    headers: {
        'User-Agent': 'request'
    }
};

function gettime(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var time=  Date.parse(info.pushed_at);
        var webtime=new Date(time+480000).toLocaleString();
        console.log('uptime:'+webtime);
        fs.readFile('hosttime.txt', function (err, data) {
		   if (err) {
		       return console.error(err);
		   }
		   var localtime=data.toString();
		   console.log("localtime:" +localtime);
		   if (localtime==webtime) {console.log('true')}
		   	else{
                console.log('writeFile....')
                fs.writeFile("hosttime.txt",webtime,function (err) {
                     if (err) throw err ;
                     console.log("TimeFile Saved !");
                     writehost();
                 });

                }
		});
    }
}
function writehost(){
var hsotsoptions = {
    url: 'https://raw.githubusercontent.com/racaljk/hosts/master/hosts',
    headers: {
        'User-Agent': 'request'
    }
};

function gethosts(error, response, body) {
    if (!error && response.statusCode == 200) {
        var hosts=body;
         fs.writeFile("hosts",hosts,function (err) {
                     if (err) throw err ;
                     console.log("hosts Saved !");
                 });
    }
}

request(hsotsoptions, gethosts);
    
}
request(options, gettime);
