const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const validateApiKey = require("./modules/validateApiKey");
const createAccountModule = require("./modules/createAccountModule");
const loginModule = require("./modules/loginModule")
const productsModule = require("./modules/productsModule");
const getProducts = require("./modules/getProductsModule");
const putProducts = require("./modules/putProductsModule");
const deleteProducts = require("./modules/deleteProductsModule");
const questionModule = require("./modules/createQuestionModule");
const questioUserModule = require("./modules/questionUsersModule");
const checkinModule = require("./modules/checkinModule");



const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(validateApiKey);

app.use("/createAccount", createAccountModule);
app.use("/login", loginModule);
app.use("/products", productsModule);
app.use("/getProducts", getProducts);
app.use("/putProducts", putProducts);
app.use("/deleteProducts", deleteProducts);
app.use("/question", questionModule);
app.use("/questionUser", questioUserModule);
app.use("/checkin", checkinModule);

db.connect()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados");

    app.listen(port, () => {
      console.log(`Servidor está ouvindo em http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
