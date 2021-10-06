const { json } = require("express");
const express = require("express");
const fs = require("fs");
const body_parser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(cors());







app.get("/get", (req, res, next) => {
  let obj = fs.readFileSync('text_json.txt',  {encoding:'utf8', flag:'r'});
  var r = req.query.form;
  console.log(req.query);
  r = JSON.parse(r);
  
  r = r[0].value;
  obj = JSON.parse(obj);
  var sana = "Ei tietoo :(";
  for(var i of obj){
    if (r == i.suomeksi){
      sana = i.englanniksi;
    }
  }
  console.log("lähetetään", sana);
  var j = {"value": sana}
  res.send(j);
});

app.post("/post", (req, res, next) => {
  const r = req.query.form;
  console.log(r, "postia");
  r = JSON.parse(r);
  var f_val = r[0].value;
  var e_val = r[1].value;
  let obj = fs.readFileSync('text_json.txt',  {encoding:'utf8', flag:'r'});
  obj = JSON.parse(obj);
  var onko = false;
  for(var i of obj){
    if (f_val == i.suomeksi){
      onko = true;
    }
  }
  if (onko == false){
    console.log(JSON.stringify(r.fin), "lol");

    obj.push({"suomeksi":f_val, "englanniksi" : e_val});
    obj = JSON.stringify(obj);
    console.log(obj, "str")
    fs.writeFileSync('text_json.txt', obj);
    var k = {"value": ["lisatty", e_val]}
    res.send(k);
  }else{
    var ei = {"value": "on jo sanakirjassa"}
    res.send(ei);
  }

});

app.listen(3000, () => {
  console.log("kuntelen");
});



/*
function tee_map() {
  var obj = fs.readFileSync("./text.txt").toString();

  obj = obj.split((separator = "\n"));

  console.log(obj);
  const map1 = new Map();
  for (let key in obj) {
    console.log(key, "key");
    var lol = obj[key].split(";");
    console.log("vittu", lol[0], lol[1]);
    map1.set(lol[0], lol[1]);
  }
  return map1;
}

app.get("/:data", (req, res) => {
  const sana = req.params.data.toString();
  var vast = "Ei tietoa";
  map1 = tee_map(sana);
  if (map1.has(sana)) {
    vast = map1.get(sana);
  }

  res.send(vast);
});

app.post("/post/post", (req, res) => {
  const sana = req.body;
  console.log(sana);
  var key;
  var val;
  for (const x in sana) {
    key = x.toString();
    val = sana[key];
  }
  var vast;
  map1 = tee_map();
  if (map1.has(key)) {
    vast = "ei lisätty!";
  } else {
    var vit = key + ";" + val + "\n";
    console.log("lisätään:" + vit);
    fs.appendFileSync("./text.txt", vit);

    vast = "lisätty: " + key;
  }
  res.send(vast);
});
*/

