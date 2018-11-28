var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


router.post('/comment', function(req, res, next) {
    console.log("in the post route");
    console.log(req.body);
    var newcomment = Comment(req.body);
    newcomment.save(function(err, result){
        if(err) {console.log("ERROR"); res.sendStatus(500);}
        else{
            res.sendStatus(200);
        }
    })
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("request query", req.query.name);
    var name = req.query.name;
    
    if(name) //anything exists in the name field
    {
        Comment.find({Name : req.query.name}, function(err,commentList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
        console.log(commentList); //Otherwise console log the comments you found
        res.json(commentList); //Then send the comments
      }
    })
    }
    else{
    console.log("In the GET route?");
    Comment.find(function(err,commentList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
        console.log(commentList); //Otherwise console log the comments you found
        res.json(commentList); //Then send the comments
      }
    })
    }
});


router.delete('/comment', function(req, res, next) {
  Comment.find({}).remove(function(err, commentList) {
        if (err) return console.error(err); //If there's an error, print it out
         else {
            res.sendStatus(200);
          }
   });
   
   
//   router.get('/comment', function(req, res, next) {
//     console.log("In the GET route?");
//     Comment.find(function(err,commentList) { //Calls the find() method on your database
//       if (err) return console.error(err); //If there's an error, print it out
//       else {
//         console.log(commentList); //Otherwise console log the comments you found
//         res.json(commentList); //Then send the comments
//       }
//     })
// });



});


module.exports = router;
