const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    dueDate :{
        type:Date
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref :'User' //it helps us to fetch all user info
    }
},{timestamps:true});

const Tasks = mongoose.model('Tasks',taskSchema);

module.exports = Tasks;