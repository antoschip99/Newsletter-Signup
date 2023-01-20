
const express = require('express')
const https = require("https");
const bodyParser = require("body-parser");

const app = express()
const port = 3000

//funzione di express che ci constente di attingere a file statici.
app.use(express.static("public"));

// funzione body-parser legata ad express per le funzioni post.
app.use(express.urlencoded({extended:true}));

// 


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
 let fName = req.body.fName;
 let lName = req.body.lName;
 let email = req.body.email;

//sezione MAILCHIMP
 let data = {
   members: [
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: fName,
         LNAME: lName
       }
     }
   ]
 };

 const jsonData = JSON.stringify(data);


const url = "https://us21.api.mailchimp.com/3.0/lists/bf792b9bbd";
const options = {
  method: "POST",
  auth: "Antonio1:a-037a361ac8726dd7a7d31cba179de993-us21"
}

 const request = https.request(url, options, (response) => {
   response.on("data", (data) => {
     // console.log(JSON.parse(data));

//useremo per indiraizzare alla pagina se lo status code dara 200 o differente.
     if (response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
       console.log("success");
     }else{
       res.sendFile(__dirname + "/failure.html");
       console.log("failure");
     }
   });
 });

request.write(jsonData);
request.end();
});
//fine sezione MAILCHIMP


//tramite button da failure ritorniamo all "/"
app.post("/failure", (req, res) => {
 res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server listening on port ` + port)
})


// 037a361ac8726dd7a7d31cba179de993-us21

// bf792b9bbd
