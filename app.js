const { json } = require("express");
const express = require("express");
const fs = require("fs");
const body_parser = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Terska");
});

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

app.listen(3000, () => {
  console.log("kuntelen");
});
