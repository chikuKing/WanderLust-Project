const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));
// //signed cookies
// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", { signed: true });
//     res.send("Signed cookie sent");
// });

// //sending cookies
// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "hello"); //this is the name value pair
//     res.send("Sent you some cookies")
// });
// //verifying signed cookie
// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies); // for signed cookies
//     res.send("verified");
// });



// //cookie parser
// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("hi, I am root");
// });

// app.get("/greet", (req, res) => {
//     let { name = "anaonymous" } = req.cookies;
//     res.send(`Hi, ${name}`);
// });


app.use("/users", users);
app.use("/posts", posts);

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{ // middleware
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query; //default name is aonymous
  // console.log(req.session);
  req.session.name = name;
  // console.log(req.session.name);

  if (name === "anonymous") {
    req.flash("error", "user not registered");
  } else {  
    req.flash("success", "user registered successfully !");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  // res.send(`Hello, ${req.session.name}`);
  // console.log(req.flash("success"));
  
  res.render("page.ejs", { name: req.session.name });
})



// app.get("/reqcount", (req, res)=>{
//   if(req.session.count){
//       req.session.count++;
//   }else{
//       req.session.count= 1;
//   }

//   res.send(`You sent a request ${req.session.count} times`)
// });

//   app.get("/test", (req, res)=>{
//     res.send("test successful");
//   });



app.listen(3000, () => {
  console.log("Server is listening to 3000")
});

