var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var {movieModel} = require('./model/movie_details')


var app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://shaji:ponnu123@cluster1.u2cuq.mongodb.net/moviedb?retryWrites=true&w=majority",{ useNewUrlParser: true},{ useUnifiedTopology: true })


app.post('/addmovie', async (req,res)=>{
 try
 {
    var data= req.body;

    var data = new movieModel(req.body);
    var result = await data.save();
    res.json(result);
    console.log(result);
 }
 catch(error){
     res.status(500).send(error);
 }

})

app.get('/viewall', async (req,res)=>{
    try
    {
        var result= await movieModel.find().exec();
        res.json(result);
    }
    catch(error){res.status(500).send(error)};

})

app.post('/search', async (req,res)=>{
    try
    {
         movieModel.find(req.body, (error,data)=>{
             if(error){throw error}
             else{  res.json(data)}
         })
       
    }
    catch(error){res.status(500).send(error)};
    
})

app.post('/delete', async (req,res)=>{
    try
    {
        movieModel.findByIdAndDelete(req.body.id, (error,data)=>{
            if(error){res.send(error)}
            else{res.json({'status':'Success'})};
        })
    }
    catch(error){res.status(500).send(error)};
})

app.post('/update',async (req,res)=>{
    try
    {
        movieModel.findByIdAndUpdate(req.body.id,
            {
                movieName:req.body.movieName,actorName:req.body.actorName,
                actressName:req.body.actressName,directorName:req.body.directorName,
                cameraman:req.body.cameraman,yearofRelease:req.body.yearofRelease
            },(error,data)=>{
                if(error){res.send(error)}
                else{res.json({'status':'Success'})}
            })
    }
    catch(error){res.status(500).send(error)};
})





app.listen(process.env.PORT || 3002,function(){
    console.log("My node server is working fine!!!")
})