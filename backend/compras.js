// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
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
        // ,
        // idUsuario: {
        //     type: String,
        //     required: true
        // }
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Compras", ComprasSchema); 