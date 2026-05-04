import { Timestamp } from "mongodb";

const LinkSchema = new Mongoose.Schema({
    title: String,
    url: String,

    clicks: {type: Number, default: 0},

}, {Timestamp: true});