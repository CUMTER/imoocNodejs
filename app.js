var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var Movie = require("./modals/movie");
var bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var moment = require("moment");
var port = 3000;

mongoose.connect("mongoose://localhost");

var app = express();

app.set("views","./views/pages/");
app.set("view engine","jade");
app.use(bodyParser.urlencoded({ extended: false }));


// app.use(serveStatic('http://localhost:3000/bower_components'));
//app.use(serveStatic('bower_components'));
app.use(express.static(__dirname));
app.listen(port);

console.log("demo start on 3000");

// home page
app.get("/",function(req,res){
	Movie.fetch(function(err,movies){
		res.render("index",{
			title: "mooc 首页",
			movies,movies
		});
	})
	// res.render("index",{title:"mooc 首页",movies:[
	// 	{title:"机械战警",_id:1,poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"},
	// 	{title:"机械战警",_id:2,poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"},
	// 	{title:"机械战警",_id:3,poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"},
	// 	{title:"机械战警",_id:4,poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"},
	// 	{title:"机械战警",_id:5,poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"},
	// 	{title:"机械战警",_id:6,poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"},
	// 	]});
});

// detail page

app.get("/movie/:id",function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		res.render("detail",{
			title: "mooc" + movie.title,
			movie: movie
		});
	});

app.post();
	// res.render("detail",{title:"mooc 详情页",movie:{
	// 	doctor:"帕蒂鸭梨",
	// 	country:"美国",
	// 	title:"机械战警",
	// 	year:"2014",
	// 	langaue:"en",
	// 	poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
	// 	flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
	// 	summary:"啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
	// }});
});

// admin page

app.get("/admin/movie",function(req,res){
	res.render("admin",{title:"mooc 管理页",movie:{
		doctor:"",
		country:"",
		title:"",
		year:"",
		langaue:"",
		poster:"",
		flash:"",
		summary:"",
	}});
});

// list page

app.get("/admin/list",function(req,res){
	res.render("list",{title:"mooc 列表页",movies:[{
		doctor:"帕蒂鸭梨",
		country:"美国",
		title:"机械战警",
		year:"2014",
		poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
		flash:"http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf",
		summary:"啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
	}]});
});