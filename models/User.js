const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema( {
    username:{
        type: String
    },
    id:{
        type: Number
    },
    date:{
        type:Date
    }



});
let User = mongoose.model('User',UserSchema);
module.exports={User};