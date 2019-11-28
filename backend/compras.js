// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema Compras 
const ComprasSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        preco: {
            type: String,
            required: true
        },
        quantidade: {
            type: String,
            required: true
        }
        ,
        usuario: {
            type: String,
            required: true
        }
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Compras", ComprasSchema); 