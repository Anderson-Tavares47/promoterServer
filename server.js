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
const searchModule = require("./modules/createSearchModule");
const searchUserModule = require("./modules/searchUsersModule");
const checkinModule = require("./modules/checkinModule");
const getUsers = require("./modules/getUsersModule");
const getSearch = require("./modules/getSearchModule");
const getQuestion = require("./modules/getQuestionsModule");
const getCollaboratorsModule = require("./modules/getCollaboratorsModule");
const putCollaboratorsModule = require("./modules/putCollaboratorsModule");
const deleteCollaboratorsModule = require("./modules/deleteProductsModule");
const collaboratorsModule = require("./modules/collaboratorsModule");
const getRoutesModule = require("./modules/getRoutesModule");
const postRoutesModule = require("./modules/postRoutesModule");
const putRoutesModule = require("./modules/putRoutesModule");
const deleteRoutesModule = require("./modules/deleteRoutesModule");


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
app.use("/search", searchModule);
app.use("/searchUser", searchUserModule);
app.use("/checkin", checkinModule);
app.use("/users", getUsers);
app.use("/getSearch", getSearch);
app.use("/getQuestion", getQuestion);
app.use("/collaborators", collaboratorsModule);
app.use("/putCollaborators", putCollaboratorsModule);
app.use("/deleteCollaborators", deleteCollaboratorsModule);
app.use("/getCollaborators", getCollaboratorsModule);
app.use("/getRoutes", getRoutesModule);
app.use("/postRoutes", postRoutesModule);
app.use("/putRoutes", putRoutesModule);
app.use("/deleteRoutes", deleteRoutesModule);

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
