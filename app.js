require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app = express();
const path = require('path');
const newOTP = require('otp-generator');
var flash = require('connect-flash');
const { request } = require('http');
const { response } = require('express');
const { trim, result, update } = require('lodash');
const { StringDecoder } = require('string_decoder');
const { stringify } = require('querystring');
var generatedforgototp;
var generatedOTP;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());//used
app.use(cors());//middlewares
app.use(express.json());
app.use(session({
    secret: "Rusty is a dog",
    cookie : {maxAge : 60000},
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//DB CONNECTION

mongoose.connect("mongodb://localhost:27017/megalith_2023", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log(err);
});
//=================API KEYS========================
// These id's and secrets should come from .env file.
// const CLIENT_ID = '504976362886-ld0uqsmbdh57bh1pmvvl8m5osfcsqk77.apps.googleusercontent.com';
const CLIENT_ID='924498916505-k4g8t22amgdifgdq7itdivfphnnapk0t.apps.googleusercontent.com';
// const CLEINT_SECRET = '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';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//040e3AXMK6cj6CgYIARAAGAQSNwF-L9Ir0WU85SnhpYH5eBNfqMy-mb03hRA2PLzwtFinMkCyUCAf88TvNlP1Yitb0bA81J4Hn9c';
const REFRESH_TOKEN = '1//04E7qAgS3bHb0CgYIARAAGAQSNwF-L9IrfslsRfIaUShgq3fkbGDOoCw4r1maCVIMGA-nI2SG9xlzOp0f_nC8_szjNs9EROIUCWU';
const jwtSecret = 'some super secret';
//=================================================
//User Schema
//=================================================
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
   name: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: Number,
        required: true,
        trim: true
    },
    college: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    yearsOfStudy: {
        type: Number,
        trim: true
    },
    getmipid : {
        type: String,
        required: true,
        trim: true
    },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
//=======================================================     
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//========================================================

//======================================================
//Defining register for event data
const registereventSchema=new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber :{
        type:String,
        required:true,
        trim:true
    },
    emailID :{
        type: String,
        required:true,
        trim:true

    },
});

const registerevent = mongoose.model("registerevent", registereventSchema);
//Defining register for event data
const registerworkshopSchema=new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber :{
        type:String,
        required:true,
        trim:true
    },
    emailID :{
        type: String,
        required:true,
        trim:true

    },
});

const registerworkshop = mongoose.model("registerworkshop", registerworkshopSchema);

const registereventandworkshopSchema=new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber :{
        type:String,
        required:true,
        trim:true
    },
    emailID :{
        type: String,
        required:true,
        trim:true

    },
});

const registereventandworkshop = mongoose.model("registereventandworkshop", registereventandworkshopSchema);
const MIP_IDSchema = new mongoose.Schema({
    mipid :{
        type:String,
        required:true,
        trim:true
    },
    no_of_participant :{
        type: Number,
        required:true,
        trim:true

    },
})
const MIP_ID = mongoose.model("MIP_ID", MIP_IDSchema)
//=====================
// ROUTES
//=====================

// Showing home page
app.use('/', express.static(path.join(__dirname, '/views/video/ajanta')));
app.use('/', express.static(path.join(__dirname, '/views/home')));
app.get("/", function (req, res) {
    res.render("home");
});

//Showing comming soon page

app.use('/commingsoon', express.static(path.join(__dirname, '/views/commingsoon')));
app.get("/commingsoon", function (req, res) {
    res.render("commingsoon");
});

// Events pages 
app.use('/event', express.static(path.join(__dirname, '/views/video/qutub')));
app.use('/event', express.static(path.join(__dirname, '/views/events')));
app.get("/event", function (req, res) {
    res.render("event");
});

app.use('/event/greencanvas', express.static(path.join(__dirname, '/views/event1')));
app.get("/event/greencanvas", function (req, res) {
    res.render("event1");
});

app.use('/event/cwiz', express.static(path.join(__dirname, '/views/event2')));
app.get("/event/cwiz", function (req, res) {
    res.render("event2");
});

app.use('/event/euclid-d-canvas', express.static(path.join(__dirname, '/views/event3')));
app.get("/event/euclid-d-canvas", function (req, res) {
    res.render("event3");
});

app.use('/event/photography', express.static(path.join(__dirname, '/views/event4')));
app.get("/event/photography", function (req, res) {
    res.render("event4");
});

app.use('/event/datahunt', express.static(path.join(__dirname, '/views/event5')));
app.get("/event/datahunt", function (req, res) {
    res.render("event5");
});

app.use('/event/teramind', express.static(path.join(__dirname, '/views/event6')));
app.get("/event/teramind", function (req, res) {
    res.render("event6");
});

app.use('/event/modelexhibition', express.static(path.join(__dirname, '/views/event7')));
app.get("/event/modelexhibition", function (req, res) {
    res.render("event7");
});

app.use('/event/rotolare', express.static(path.join(__dirname, '/views/event8')));
app.get("/event/rotolare", function (req, res) {
    res.render("event8");
});

app.use('/event/criar', express.static(path.join(__dirname, '/views/event9')));
app.get("/event/criar", function (req, res) {
    res.render("event9");
});

app.use('/event/instridge', express.static(path.join(__dirname, '/views/event10')));
app.get("/event/instridge", function (req, res) {
    res.render("event10");
});

app.use('/event/darkcode', express.static(path.join(__dirname, '/views/event11')));
app.get("/event/darkcode", function (req, res) {
    res.render("event11");
});


// Workshop page
app.use('/workshop', express.static(path.join(__dirname, '/views/video/qutub')));
app.use('/workshop', express.static(path.join(__dirname, '/views/workshop')));
app.get("/workshop", function (req, res) {
    res.render("workshop");
});

app.use('/workshop1', express.static(path.join(__dirname, '/views/workshop1')));
app.get("/workshop1", function (req, res) {
    res.render("workshop1");
});

app.use('/workshop2', express.static(path.join(__dirname, '/views/workshop2')));
app.get("/workshop2", function (req, res) {
    res.render("workshop2");
});

//Sponsors page
app.use('/sponsors', express.static(path.join(__dirname, '/views/video/konark')));
app.use('/sponsors', express.static(path.join(__dirname, '/views/sponsors')));
app.get("/sponsors", function (req, res) {
    res.render("sponsors");
});

//our team
app.use('/team', express.static(path.join(__dirname, '/views/video/tajmahal')));
app.use('/team', express.static(path.join(__dirname, '/views/team')));
app.get("/team", function (req, res) {
    res.render("team");
});

//theme page
app.use('/theme', express.static(path.join(__dirname, '/views/video/konark')));
app.use('/theme', express.static(path.join(__dirname, '/views/theme')));
app.get("/theme", function (req, res) {
    res.render("theme");
});
// Showing secret page
app.use('/secret/:id', express.static(path.join(__dirname, '/views/dashboard')));
app.get("/secret/:id", isLoggedIn, function (req, res) {
    const {id} = req.params;
    console.log(id);
    var objectId = mongoose.Types.ObjectId(id);
    User.findOne({ _id: objectId }, function (err, foundUsers) {
        if (foundUsers) {
            // console.log(foundUsers,typeof(foundUsers));
            res.render("secret", {'data':foundUsers});
            // res.json({ data: foundUsers.id })
        } else {
            console.log("not found");
            return;
        }

    })
});

app.post('/registerforevent', function(req,res){
    const id = req.body.userid;
    var objectId = mongoose.Types.ObjectId(id);
    User.findOne({ _id: objectId }, function (err, foundUsers) {
        if (foundUsers) {
            // console.log(foundUsers,typeof(foundUsers));
            let name = foundUsers.name;
            let mobileNumber = foundUsers.mobileNumber;
            let emailID = foundUsers.username;
            registerevent.findOne({emailID:emailID},function(err,userfound){
                if(userfound){
                    console.log("User already exist");
                    res.json({success : false});
                    console.log(userfound);
                }
                else{
                    const object = new registerevent({
                        name : name,
                        mobileNumber:mobileNumber,
                        emailID : emailID
                    })
                    object.save(function(err,doc){
                        if(err){
                            console.log(err)
                        } 
                    });
                    res.json({success : true});
                }
            })
        } else {
            console.log("Something error occured");
            return;
        }

    });
});

app.post('/registerforworkshop', function(req,res){
    const id = req.body.userid;
    console.log(id);
    var objectId = mongoose.Types.ObjectId(id);
    User.findOne({ _id: objectId }, function (err, foundUsers) {
        if (foundUsers) {
            // console.log(foundUsers,typeof(foundUsers));
            let name = foundUsers.name;
            let mobileNumber = foundUsers.mobileNumber;
            let emailID = foundUsers.username;
            registerworkshop.findOne({emailID:emailID},function(err,userfound){
                if(userfound){
                    console.log("User already exist");
                    res.json({success : false});
                    console.log(userfound);
                }
                else{
                    const object = new registerworkshop({
                        name : name,
                        mobileNumber:mobileNumber,
                        emailID : emailID
                    })
                    object.save(function(err,doc){
                        if(err){
                            console.log(err)
                        } 
                    });
                    res.json({success : true});
                }
            })
            // res.json({ data: foundUsers.id })
        } else {
            console.log("Something error occured");
            return;
        }
    });
});
app.post('/registereventandworkshop', function(req,res){
    const id = req.body.userid;
    console.log(id);
    var objectId = mongoose.Types.ObjectId(id);
    User.findOne({ _id: objectId }, function (err, foundUsers) {
        if (foundUsers) {
            // console.log(foundUsers,typeof(foundUsers));
            console.log(foundUsers);
            let name = foundUsers.name;
            let mobileNumber = foundUsers.mobileNumber;
            let emailID = foundUsers.username;
            console.log(name);
            console.log(mobileNumber);
            console.log(emailID);
            registereventandworkshop.findOne({emailID:emailID},function(err,userfound){
                if(userfound){
                    console.log("User already exist");
                    res.json({success : false});
                    console.log(userfound);
                }
                else{
                    const object = new registereventandworkshop({
                        name : name,
                        mobileNumber:mobileNumber,
                        emailID : emailID
                    })
                    object.save(function(err,doc){
                        if(err){
                            console.log(err);
                        }else console.log("registered"); 
                    });
                    res.json({success : true});
                }
            })
            // res.json({ data: foundUsers.id })
        } else {
            console.log("Something error occured");
            return;
        }
    });
});
app.post('/getotp', function(req,res){
    let otp = newOTP.generate(6, {lowerCaseAlphabets: false , upperCaseAlphabets: false , specialChars:false});
    generatedOTP = otp;
    let email = req.body.email;
    User.findOne({ username: email }, function (err, foundUsers) {
        if (foundUsers) {
            console.log("email already exist");
            // req.flash('message','Email already exist');
            res.json({success : true});
        }
        else{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                        user: 'megalith2023@gmail.com', // generated ethereal user
                        pass: 'ojpstqblgjculdlc', // generated ethereal password
                    },
            });
                        // send mail with defined transport object
            let mailinfo ={
                from: '" Megalith " <megalith2023@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "OTP for Email Verification!", // Subject line
                // text: "Hello world?", // plain text body
                text: "Hey here is new quert for you..",
                html: `<h3>Welcome to our website</h3>
                    <p> OTP for confirmation of email is as follows. </p>
                    <P>OTP : ${generatedOTP}</P>
                    <p>Regards,</p>
                    <p>Team Megalith</p>`
            };
            transporter.sendMail(mailinfo, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
            res.json({success:false})
        }
    });
});
// Showing signup form
app.use('/signup', express.static(path.join(__dirname, '/views/video/tajmahal')));
app.use('/signup', express.static(path.join(__dirname, '/views/registerpage')));
app.get("/signup", function (req, res) {
    res.render("login", {message : req.flash('message')});
});

// Handling user signup
app.post("/signup", async function (req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let mobileNumber = req.body.mobileNumber;
    let college = req.body.college;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    let gender = req.body.gender;
    let havemipid = req.body.havemipid;
    let yearsOfStudy = req.body.yearsOfStudy;
    let enteredOTP = req.body.otpentered;
    let getmipid = req.body.mipid;
    console.log(req.body.otpentered)
    console.log(havemipid);
    if(havemipid == 'No'){
        getmipid = 'No';
    }
    if(getmipid !='No'){
        getmipid=getmipid.slice(2);
        getmipid = getmipid.toLowerCase();
        getmipid = "MI" + getmipid;
    }
    var finduser = {mipid : getmipid};
    console.log(getmipid);
    console.log(generatedOTP);
    console.log(enteredOTP);
    if(generatedOTP == enteredOTP){
        MIP_ID.findOne(finduser, function (err, foundUsers){
            console.log(foundUsers);
            if(foundUsers){
                console.log("MIP Id find");
                User.register({
                    username,
                    name,
                    mobileNumber,
                    college,
                    country,
                    state,
                    city,
                    gender,
                    yearsOfStudy,
                    getmipid
                },
                password,
                    function (err, user) {
                        if (err) {
                            console.log(err);
                            req.flash('message','Email already exist');
                            res.redirect("/signup");
                        }
                        console.log("User registered successfully");
                        passport.authenticate("local")(
                        req, res, function () {
                            console.log("")
                            if(req.isAuthenticated(req, res)) {
                                res.redirect('/secret/'+req.user.id);}
                            });
            
                    });
            }else if(getmipid=='No'){
                User.register({
                    username,
                    name,
                    mobileNumber,
                    college,
                    country,
                    state,
                    city,
                    gender,
                    yearsOfStudy,
                    getmipid
                },
                password,
                    function (err, user) {
                        if (err) {
                            console.log(err);
                            req.flash('message','Email already exist');
                            res.redirect("/signup");
                        }
                        console.log("User registered successfully");
                        passport.authenticate("local")(
                        req, res, function () {
                            console.log("")
                            if(req.isAuthenticated(req, res)) {
                                res.redirect('/secret/'+req.user.id);}
                            });
            
                    });
            }
            else{
                console.log(err);
                console.log("Entered MIP ID doesn't exist");
                req.flash("message","Entered MIP ID does not exist");
                res.redirect('/signup');
            }
        });
        
    }else{
        console.log("OTP does not match")
        req.flash('message',"OTP does not match")
        res.redirect("/signup");
    }
});

app.post("/login", (req, res) => {
    passport.authenticate("local",
        (err, user, options) => {
          if (user) {
            // If the user exists log him in:
            req.login(user, (error)=>{
              if (error) {
                res.send(error);
              } else {
                if(req.isAuthenticated(req, res)) {
                    res.redirect('/secret/'+req.user.id);
                }
                // HANDLE SUCCESSFUL LOGIN 
                // e.g. res.redirect("/home")
              };
            });
          } else {
            console.log(options.message);
            req.flash('message',options.message);
            res.redirect('/signup');
             // Prints the reason of the failure
            // HANDLE FAILURE LOGGING IN 
            // e.g. res.redirect("/login"))
            // or
            // res.render("/login", { message: options.message || "custom message" })
          };
    })(req, res)
  });


//Handling user logout
app.get("/logout", function (req, res) {
    res.redirect("/");
});
//Checking For authetication 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/signup");
}
app.use('/forgot-password', express.static(path.join(__dirname, '/views/forgotpassword')))
app.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
});

app.post('/getforgototp', function(req, res) {
    let forgototp = newOTP.generate(6, {lowerCaseAlphabets: false , upperCaseAlphabets: false , specialChars:false});
    generatedforgototp = forgototp;
    console.log(generatedforgototp)
    let emailID = req.body.email;
    User.findOne({username : emailID},function(err,foundUsers){
        if(foundUsers){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                        user: 'megalith2023@gmail.com', // generated ethereal user
                        pass: 'hfzippmfntgvsltb', // generated ethereal password
                    },
            });
                        // send mail with defined transport object
            let mailinfo ={
                from: '" Megalith " <megalith2023@gmail.com>', // sender address
                to: emailID, // list of receivers
                subject: "OTP for Email Verification!", // Subject line
                // text: "Hello world?", // plain text body
                text: "Hey here is new quert for you..",
                html: `<h3>Welcome to our website</h3>
                    <p> OTP for confirmation of email is as follows. </p>
                    <P>OTP : ${generatedforgototp}</P>
                    <p>Regards,</p>
                    <p>Team Megalith</p>`
            };
            transporter.sendMail(mailinfo, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
        }  
        else {
            res.json({success : true});
        }      
    })

});
app.post('/forgot-password', (req, res, next) => {
    let emailID = req.body.enteredEmail;
    let newpassword = req.body.newpassword;
    let confirmpassword = req.body.confirmpassword;
    let enteredforgotOTP = req.body.forgototp;
    if (enteredforgotOTP == generatedforgototp){
        User.findOne({username:emailID},function(err,foundUsers){
            if(foundUsers){
                foundUsers.setPassword(newpassword, function(err,user){
                    if (err) {
                        console.log(err)
                        res.json({success: false, message: 'Password could not be saved. Please try again!'});
                    } else { foundUsers.save();
                        console.log(foundUsers);
                        req.flash('message','Password Updated Successfully');
                        res.redirect("/signup"); }
                });
            }
            else{
                
                res.json("User not found");
            }
        })
    }
});


// app.post('/forgot-password', (req, res, next) => {
//     const { enteredEmail } = req.body;

//     //Make sure user exists inside the database
//     User.findOne({ username: enteredEmail }, function (err, foundUsers) {
//         if (foundUsers) {
//             // User exists and now create a one time link valid for 15 minutes
//             console.log(foundUsers);
//             const databaseEmail = foundUsers.username;
//             const ID = foundUsers._id.toString();
//             const secret = jwtSecret + foundUsers.password;
//             const payload = {
//                 email: databaseEmail,
//                 id: ID
//             }
//             const token = jwt.sign(payload, secret, { expiresIn: '15m' })
//             const link = `https://2023.megalith.co.in/reset-password/${ID}/${token}`
//             console.log(link);
//             const transporter = nodemailer.createTransport({
//                   host: "smtp.gmail.com",
//                   port: 587,
//                   secure: false, // true for 465, false for other ports
//                   auth: {
//                     user: 'megalith2023@gmail.com', // generated ethereal user
//                     pass: 'ojpstqblgjculdlc', // generated ethereal password
//                   },
//                 });
//                 // send mail with defined transport object
//                 let mailinfo ={
//                             from: '" Megalith " <megalith2023@gmail.com>', // sender address
//                             to: databaseEmail, // list of receivers
//                             subject: "Reset password link", // Subject line
//                             html : `<h2>Hello!</h2>
//                                     <p>You are receiving this email because we received a password reset request for your account.</p>
//                                     <a href="${link}"><button style  = "background-color: blue; border: none; color: white; padding: 10px 24px; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content:center; font-size: 12px; border-radius: 25px; cursor: pointer;"> Reset Password </button></a>
//                                     <h3>Regards,</h3>
//                                     <h3>Megalith 2023</h3>`
//                         };
//                       transporter.sendMail(mailinfo, function(error, info){
//                         if (error) {
//                           console.log(error);
//                           res.send("Not Found!!")
//                         } else {
//                           console.log('Email sent: ' + info.response);
//                           res.redirect("/");
//                         }
//                       });
//         }
//         else{
//             console.log("User not found");
//         }
//     });
// });



// app.use('/reset-password/:ID/:token', express.static(path.join(__dirname, '/views/resetpassword')))
// app.get('/reset-password/:ID/:token', (req, res, next) => {
//     const { ID, token } = req.params;
//     //check if this id exists in database
//     //objectId=require('mongodb').ObjectID(ID);
//     var objectId = mongoose.Types.ObjectId(ID);
//     User.findOne({ _id: objectId }, function (err, foundUsers) {
//         if (foundUsers) {
//             //We have a valid ID and we have a valid User with this ID
//             const secret = jwtSecret + foundUsers.password;
//             try {
//                 const payload = jwt.verify(token, secret);
//                 res.render('reset-password', { email: foundUsers.username })
//             } catch (error) {
//                 console.log(error.message);
//                 res.send(error.message);
//             }
//         } else {
//             res.send("Invalid User ID");
//             return;
//         }

//     })
// });
// app.post('/reset-password/:ID/:token', (req, res, next) => {
//     const { ID, token } = req.params;
//     const { password, password2 } = req.body;
//     var objectId = mongoose.Types.ObjectId(ID);
//     User.findOne({ _id: objectId }, function (err, foundUsers) {
//         if (foundUsers) {
//             const secret = jwtSecret + foundUsers.password;
//             try {
//                 const payload = jwt.verify(token, secret);
//                 //validate password and password2 should match 
//                 if (password !== password2) {
//                     res.send(alert("The passwords are not same! Please see to it!"));
//                 }
//                 //we can simply find the user using the payload email and id and update with new password
//                 /*
//                 USING BCRYPT AS AN ALTERATIVE BUT USE PASSPORT.JS FIRST FOR HASHING 
//                 const securePassword= async (password)=>{
//                     const passwordHash = await bcrypt.hash(password,5);
//                     foundUsers.password = passwordHash;
//                 }
//                 //always hash the password before saving
//                 */
                
//                 foundUsers.setPassword(password, function(err,user){
//                     if (err) {
//                         console.log(err)
//                         res.json({success: false, message: 'Password could not be saved. Please try again!'});
//                     } else { foundUsers.save();
//                         console.log(foundUsers);
//                         res.redirect("/signup"); }
//                      });
                
//             } catch (error) {
//                 console.log(error.message);
//                 res.send(error.message);
//             }
//         } else {
//             res.send("Invalid USER ID");
//             return;
//         }
//     });
//     console.log("done till here!!");
// });

//==============================================================================//

// Contact us form
app.use('/contactus', express.static(path.join(__dirname, '/views/contactus')))
app.get("/contactus", function (req, res) {
    res.render('contactus');
});


app.post('/contactus', function (req, res) {
    const sendername = req.body.sendername;
    const senderemail = req.body.senderemail;
    const sendersubject = req.body.sendersubject;
    const sendermessage = req.body.sendermessage;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
                user: 'megalith2023@gmail.com', // generated ethereal user
                pass: 'ojpstqblgjculdlc', // generated ethereal password
            },
    });
                // send mail with defined transport object
    let mailinfo ={
        from: '" Megalith " <megalith2023@gmail.com>', // sender address
        to: 'adityapandeygkp90@gmail.com , utkarshgupta6203@gmail.com ,', // list of receivers
        subject: "Query details", // Subject line
        // text: "Hello world?", // plain text body
        text: "Hey here is new quert for you..",
        html: `<p> Sender name : ${sendername} <br>
        Sender email : ${senderemail} <br>
        Sender subject : ${sendersubject} <br>
        Sender message : ${sendermessage}</p>`
    };
    transporter.sendMail(mailinfo, function(error, info){
        if (error) {
          console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
});
//PORT OR HOSTING
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server Has Started!");
});