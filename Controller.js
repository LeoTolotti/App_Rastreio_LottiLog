const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let user = models.User;
let tracking = models.Tracking;
let product = models.Product;

app.post("/login", async (req, res) => {
  let response = await user.findOne({
    where: { name: req.body.name, password: req.body.password },
  });
  if (response === null) {
    res.send(JSON.stringify("error"));
  } else {
    res.send(response);
  }
});

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Servidor Rodando");
});
/*
app.get("/create", async (req, res) => {
  let create = await user.create({
    name: "leonardo",
    password: "abc",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.send("Usuário criado com sucesso!");
});
app.get("/createtracking", async (req, res) => {
  let create = await tracking.create({
    code: "123456789BR",
    local: "Farroupilha",
    userId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.send("Tracking criado com sucesso!");
});
app.get("/createproduct", async (req, res) => {
  let create = await product.create({
    name: "Bola",
    trackingId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.send("Produto criado com sucesso!");
});

app.get("/read", async (req, res) => {
  let read = await user.findAll({
    raw: true,
  });
  console.log(read);
  res.send("Busca realizada!");
});

app.get("/update", async (req, res) => {
  let update = await user
    .findByPk(2, { include: [{ all: true }] })
    .then((response) => {
      response.Trackings[0].local = "Farroupilha-RS";
      response.Trackings[0].save();
    });
  res.send("Update realizada!");
});

app.get("/delete", async (req, res) => {
  user.destroy({
    where: { id: 2 },
  });
  res.send("Delete realizado!");
});
*/
