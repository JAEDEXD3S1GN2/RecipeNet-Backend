const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./logger.js");

module.exports = (app) => {
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(
    morgan("common", {
      stream: {
        write: (message) => {
          //logger.log(message);
          logger.info(message.trim());
        },
      },
    })
  );

  app.use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static("public"));
};
