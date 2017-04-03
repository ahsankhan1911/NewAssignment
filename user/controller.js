
var cache = require('memory-cache');




//code below will initialize an empty array in cache key and then retrieve it in var = arr
cache.put('users', []);
var arr = cache.get('users');

exports.createUser = function(req, res, next) {

    var user = {
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
       res.send(cache.get('user'));
       console.log('User' + " " + arr.length + " " + 'created');
   }
   else {


       var validateUser = false;

       arr.forEach(function (user) {

           var storedEmail = user.email;
           var newEmail = req.body.email;

           if (storedEmail == newEmail) {
               validateUser = true;
           }
       });


       if(!validateUser) {
               arr.push(req.body);
               res.send(cache.get('user'));
               console.log('User' + " " + arr.length + " " + 'created');
       }
       else {
           res.send("Email already exist");
       }
   }

    //res.send(cache.get('user'));
   // next();
};

//This handler function shows the user on windows after user created
// exports.showUser = function (req, res) {
//
// res.send(cache.get('user'));
//
// };


exports.logInUser = function (req, res) {

    var LoginCredential = req.body;
    var validity = false;

    //For Each is used for getting data from an array
    arr.forEach(function (login) {

        var logInEmail = login.email;
    var logInPass = login.password;

        if(LoginCredential.email == logInEmail && LoginCredential.password  == logInPass)
        {


            validity = true;
        }
    });
 if(!validity){
     res.send("Error! No user found");
 }
 else {
     res.send("Welcome User" + LoginCredential.firstname);
 }
};



exports.userProfile = function (req, res){


        //here filter method is used for getting an object from an array
            var result  = arr.filter(function(val){
                return val.email == req.params.email;

            });
            res.send(result);

};