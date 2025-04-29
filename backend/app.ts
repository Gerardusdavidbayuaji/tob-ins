import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("TESSTTTddddd");
});

app.listen(3000, () => {
  console.log("Running on 3000");
});
