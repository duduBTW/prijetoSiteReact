// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema dos produtos 
const ProdutosSchema = new Schema(
  {
    titulo: String,
    tipo: String,
    preco: Number,
    image: String,
    descricao: String,
    quantidadeEstoque: Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Produtos", ProdutosSchema); 