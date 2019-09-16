// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }, 
    senha: {
      type: String,
      required: true
    },
    cartao: {
      numero: String,
      nome: String,
      cvc: Number
    },
    data: {
      type: Date,
      default: Date.now
    }
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Usuarios", UsuarioSchema); 