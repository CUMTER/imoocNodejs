var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	county:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
});

MovieSchema.pre("save",function(){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();
})

MovieSchema.statics = {
	fetch: function(cb){
		this.find({})
		.sort('meta.createAt')
		.exec(cb);
	},
	fetchById: function(id,cb){
		this.findOne({_id:id})
		.exec(cb);
	},
}