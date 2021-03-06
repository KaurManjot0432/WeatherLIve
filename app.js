var express = require('express');
var request = require('request');
var port = process.env.PORT || 3456;
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get('/weather/:city',function(req,res){
    let city = req.params.city?req.params.city:'Batala';
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    request(apiUrl, function(err, apiResponse){
        if(err) throw err;
        // res.send(apiResponse.body)
        var output = JSON.parse(apiResponse.body)
        res.render('index',{title:'Weather App',result:output})
    })
})

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})