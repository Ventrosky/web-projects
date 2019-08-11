const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

import mongoose from 'mongoose';

import {users, products} from "./data";
import {UserModel} from "../models/User";
import {ProductModel} from "../models/Product";

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err);
});

const db = mongoose.connection;

db.on('error', (error) =>{
    console.log(error);
});

db.on('open', () =>{
    console.log("Database connection is open");

    UserModel.insertMany(users, (error)=>{
        if (error){
            console.log(error);
        }
    });
    ProductModel.insertMany(products, (error)=>{
        if (error){
            console.log(error);
        }
    });
});