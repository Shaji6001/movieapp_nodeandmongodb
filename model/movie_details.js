var mongoose=require('mongoose');


var filmSchema= new mongoose.Schema(
    {
        movieName:{type:String},
        actorName:{type:String},
        actressName:{type:String},
        directorName:{type:String},
        cameraman:{type:String},
        yearofRelease:{type:String}
    }
)

var movieModel= mongoose.model("movies",filmSchema);

module.exports={movieModel};
