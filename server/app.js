const express = require("express");
const app = express();
const fs = require("fs");
const { dirname } = require("path");
const path = require("path");
const cors = require("cors");
app.use(cors());
const readdirstat = require("readdirstat");
//console.log(fs.readdirSync("./public"));

let getInfo = (pa) => fs.statSync(pa);


app.use(express.static('public'))



// console.log(fs.statSync("./public"));

app.get("*", (req, res) => {
  const path = "./public" + req.url;
console.log("path:",path);
  fs.readdir(path, (err, files) => {
    if(err){
      res.send(err)
      return
    }
    else{
      const allData = files.map((item) => ({
        ...getInfo(`${path}/${item}`),
        type:
          item.split(".").length > 1 ? item.split(".").slice(-1)[0] : "folder",
        name:
          item.split(".").length > 1 ? item.split(".").slice(0, -1)[0] : item,
          fullname: item,
      }));
      res.send(allData); 
     }
  });
}); 




app.delete("*", (req, res) => {
  const path = "./public" + req.url;
console.log("path:",path);
  fs.unlink(path, (err, files) => {
    if(err){
      res.send(err)
      return
    }
    else{
      res.send("file was succesfully deleted"); 
     }
  });
}); 

// console.log(fs.statSync("./public/publicText2.txt"));
// console.log(getSize("./public/"))

app.listen(3009);
