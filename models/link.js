import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const LinkSchema = new mongoose.Schema({
    handle:{type: String, unique: true},
    title: String,
    url: String,

     clicks: {type: Number, default: 0},


}, {timestamps: true});

