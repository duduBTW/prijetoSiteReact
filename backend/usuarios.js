// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema Usuario 
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
    endereco: {
      nomeDestinatario: String,
      cep: Number,
      endereco: String,
      numero: Number,
      bairro: String,
      cidade: String,
      estado: String,
    },
    idProduto: {
      type: String
    },
    data: {
      type: Date,
      default: Date.now
    }
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Usuarios", UsuarioSchema); 