const express = require("express");
const {connect} = require("./config/database");
const logger = require("morgan");
const players = require("./app/api/routes/player.routes");
const teams = require("./app/api/routes/team.routes");
connect();
const app = express();



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


const cors = require("cors");

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

app.use("/", players);
app.use("/teams", teams);

const HTTPSTATUSCODE = require("./utils/httpStatusCode");

app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.message = HTTPSTATUSCODE[404];
  next(err);
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
})

app.disable('x-powered-by');

app.set("secretKey", "nodeRestApi");


app.listen(4200, () => {
  console.log("Node server listening on port 3000");
});