const express=require("express");
const bodyParser=require("body-parser");

const app= express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

var items=["Buy food" , "Cook Food" , "Eat Food"];
let workItems=[];
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",function(req,res)
{
    var today= new Date();
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
        
    };
var day=today.toLocaleDateString("en-US",options);
  res.render("list",{listTitle:day, newListItem: items});
})

app.post("/",function(req,res)
{
   var item = req.body.newItem;
   if(req.body.list === "work")
   {
       workItems.push(item);
       res.redirect("/work");
   }
   else
   {
    items.push(item);
    res.redirect("/");
   }

    console.log(req.body);
})

app.get("/work",function(req,res)
{
    res.render("list",{listTitle:"work",newListItem:workItems});
});
// app.post("/work",function(req,res)
// {
//     let item=req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })
app.get("/about",function(req,res)
{
    res.render("about");
    // console.log("hello")
})

app.listen("3000",function()
{
    console.log("server started on port 3000")
})