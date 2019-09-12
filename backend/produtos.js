// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ProdutosSchema = new Schema(
  {
    titulo: String,
    tipo: String,
    preco: Number,
    image: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Produtos", ProdutosSchema); 