
var cache = require('memory-cache');




//code below will initialize an empty array in cache key and then retrieve it in var = arr
cache.put('users', []);
var arr = cache.get('users');

exports.createUser = function(req, res, next) {

    var users = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: ""
        };


    // because we dont want first entry to be validate so we put this if statement

   if(arr.length == 0) {

       arr.push(req.body);
       cache.put('user', arr);
       console.log(cache.get('user'));
       console.log('User' + " " + arr.length + " " + 'created');
   }
   else {


       var validateUser = false;

       arr.forEach(function (user) {

           var storedEmail = user.email;
           var newEmail = req.body.email;

           if (storedEmail == newEmail) {
               console.log("Email already exist");
               validateUser = true;
           }
       });

       if(!validateUser) {
               arr.push(req.body);1
               console.log(cache.get('user'));
               console.log('User' + " " + arr.length + " " + 'created');
       }

   }

    next();
};

//This handler function shows the user on windows after user created
exports.showUser = function (req, res) {

res.send(cache.get('user'));

};


exports.logInUser = function (req, res) {

    var logInfo = {
        logEmail: "",
        logPassword: ""
    };
    var LoginCredential = req.body;
    var validity = false;

    //For Each is used for getting data from an array
    arr.forEach(function (login) {

        var logInEmail = login.email;
    var logInPass = login.password;

        if(LoginCredential.logEmail== logInEmail && LoginCredential.logPassword  == logInPass)
        {

            console.log("Welcome User " + login.firstname);
            validity = true;
        }
    });
 if(!validity){
     console.log("Error! No user found");
     res.end();
 }
};



exports.userProfile = function (req, res){

    var userValidity = false;

    arr.forEach(function (item, index, array) {

        var inputEmail = req.params.email;
        var storedEmail = item.email;

        //here filter method is used for getting an object from an array
            var result  = arr.filter(function(val){
                return val.email == req.params.email;
            });
        if (storedEmail == inputEmail){

            console.log("Welcome User" + " " +  item.firstname);
            res.send(result);
            userValidity = true;
        }
    });

    if(!userValidity){
        res.send("User not found ");
    }
};