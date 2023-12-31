// import express from "express";
// import bodyParser from "body-parser";
// import OpenAI from "openai";
// import dotenv from "dotenv";
// import cors from "cors";

const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/message", (req, res) => {
  const message = req.body.message;
  const response = openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  response
    .then((result) => {
      res.send(result.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
