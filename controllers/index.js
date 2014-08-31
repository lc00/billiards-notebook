// We also will be using our User model
var User = require('../models/user');
var _ = require('../public/javascript/underscore-min')

// Simple index controller
var indexController = {

  // Handle incoming requests for the '/' route
  index: function(req, res){

    // Since this route requires authentication,
    // called out in app.js, we have access to the
    // logged-in user's document from the database
    // via the injected "req.user" variable
    res.render('index', {
      user: req.user
    });
  }, 
  addShots: function(req, res){
    // console.log(req.user.username)
    res.render('addShots', {
      user: req.user,
      pageName: "Add Shots"
    });

  },
  newTable: function(req, res){

    var username = req.user.username;

    var title = req.body.form_data.title;

    var note = req.body.form_data.note;

    var array = JSON.parse(req.body.array);

    User.findOne({username: username}, function(error, user){
      if(error){
        console.log(error)
      }
      else{
        user.tablelist.push({title: title, note: note, array: array }) 
        user.save();
        res.send({ 
          result: [title, note, array]
        });
      }
        
    });

  },
  practiceShots: function(req, res){

    var username = req.user.username;

    User.findOne({username: username}, function(error, result){
      if(error){
        console.log(error);
      }
      else{
        res.render('practiceShots',{
          user: req.user,
          tablelist: result.tablelist,
          pageName: "Practice Shots"
        });
      }

    })

  },
  filteredTables: function(req, res){
    var username = req.user.username;
    var level = req.query.level;
    var cat = req.query.cat;
    var matchedTables;


    User.findOne({username: username}, function(error, user){
      if(error){
        console.log(error);
      }
      else{
        if (level !== undefined && cat !== undefined)
          matchedTables = _.where(user.tablelist, {level: level, category: cat});
        else if (level !== undefined)
          matchedTables = _.where(user.tablelist, {level:level});
        else if (cat !== undefined)
          matchedTables = _.where(user.tablelist, {category:cat});
        else 
          matchedTables = _.where(user.tablelist)


        console.log(matchedTables)
        res.send(matchedTables)
      }

    })
  }



};

// Export our index control
module.exports = indexController;