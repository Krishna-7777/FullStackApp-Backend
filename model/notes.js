const mongoose = require('mongoose')
const notesScheme = mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userID:String
})

const NotesModel = mongoose.model('note',notesScheme);

module.exports ={
    NotesModel
}