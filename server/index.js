const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
);

app.get("/", (req, res) => {
  res.send("kilimajaro");
});

app.post("/addfriend", async (req, res) => {
  const { name, age } = req.body;
  const friend = new FriendModel({ name, age });
  await friend.save();
  res.send("successfully inserted data");
});

app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });

  //   const result = await FriendModel.find();
  //   res.send(result);
});

app.patch("/update", async (req, res) => {
  const { newName, newAge, id } = req.body;
  try {
    await FriendModel.findByIdAndUpdate(id, req.body);
  } catch (err) {
    console.log(err);
  }

  res.send("updated");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FriendModel.findByIdAndDelete(id);
    res.send("deleted item");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log(`listening to port 3001`);
});
