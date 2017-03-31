var cache = require('memory-cache');



//code will below will initialize an empty array in cache key and then retrieve it in var = arr
cache.put('users', []);
var arr = cache.get('users');

exports.createUser = function(req, res, next) {

    var users =

         {
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
               arr.push(req.body);
               //cache.put('user', arr);
               console.log(cache.get('user'));
               console.log('User' + " " + arr.length + " " + 'created');
       }
   }
    next();
};


exports.showUser = function (req, res, next) {

res.send(cache.get('user'));
next();

};



exports.logInUser = function (req, res) {

    var logInfo = {
        LogEmail: "",
        LogPassword: ""
    };
    var LoginCredential = req.body;
    var validity = false;

    arr.forEach(function (login) {

        var logInEmail = login.email;
    var logInPass = login.password;




        if(LoginCredential.LogEmail== logInEmail && LoginCredential.LogPassword  == logInPass)
        {

            console.log("Welcome User " + login.firstname);
            validity = true;
        }
        // else {
        //     console.log("Error! No user found");
        //     res.end();
        // }
    });
 if(!validity){
     console.log("Error! No user found");
     res.end();
 }
};

exports.userProfile = function (req, res){

    var userValidity = false;



    arr.forEach(function (item, index, array) {

        //var storedEmail = item.email;
        var inputEmail = req.params.email;
        var storedEmail = item.email;

            var result  = arr.filter(function(val){
                return val.email == req.params.email;
            });
        if (storedEmail == inputEmail){

            res.send("Welcome User " + result);
            userValidity = true;
        }
    });

    if(!userValidity){
        res.send("User not found " +
            "Goto /user/create-user to create your account")
    }
};

// exports.logInUser = function (){
//
//
// };
