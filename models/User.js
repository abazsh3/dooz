const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema( {
    username:{
        type: String
    },
    id:{
        type: Number,
        unique:true,
        dropDups:true
    }



});
let User = mongoose.model('User',UserSchema);
module.exports={User};