const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const validateApiKey = require("./modules/validateApiKey");
const createAccountModule = require("./modules/createAccountModule");
const loginModule = require("./modules/loginModule");
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
const deleteCollaboratorsModule = require("./modules/deleteCollaboratorsModule");
const collaboratorsModule = require("./modules/collaboratorsModule");
const getRoutesModule = require("./modules/getRoutesModule");
const postRoutesModule = require("./modules/postRoutesModule");
const putRoutesModule = require("./modules/putRoutesModule");
const deleteRoutesModule = require("./modules/deleteRoutesModule");
const getCompanyModule = require("./modules/getCompanyModule");
const postCompanyModule = require("./modules/postCompanyModule");
const putCompanyModule = require("./modules/putCompanyModule");
const deleteCompanyModule = require("./modules/deleteCompanyModule");
const putSearchModule = require("./modules/putSearchModule");
const deleteSearchModule = require("./modules/deleteSearchModule");
const putQuestionModule = require("./modules/putQuestionModule");
const deleteQuestionModule = require("./modules/deleteQuestionModule");
const createQuestionModule = require("./modules/createQuestionModule");

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
app.use("/createSearch", searchModule);
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
app.use("/getCompany", getCompanyModule);
app.use("/postCompany", postCompanyModule);
app.use("/putCompany", putCompanyModule);
app.use("/deleteCompany", deleteCompanyModule);
app.use("/putSearch", putSearchModule);
app.use("/deleteSearch", deleteSearchModule);
app.use("/putQuestion", putQuestionModule);
app.use("/deleteQuestion", deleteQuestionModule);
app.use("/createQuestion", createQuestionModule);

db.connect()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados");

    app.listen(port, () => {
      console.log(`Servidor está ouvindo em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
