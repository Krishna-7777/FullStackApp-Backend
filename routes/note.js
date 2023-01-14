const express = require('express');
const { NotesModel } = require('../model/notes');

const noteRouter = express.Router();

noteRouter.get('/', async (ask, give) => {
  let notes = await NotesModel.find();
  give.send(notes);
})

noteRouter.post('/create', async (ask, give) => {
  try {
    let note = new NotesModel(ask.body);
    await note.save();
    give.send("Your Note Has been Created.");
  } catch (error) {
    give.send(`Something went Wrong!\n${error.message}`)
  }
})

noteRouter.patch('/update/:id', async (ask, give) => {
  const note = await NotesModel.findOne({ "_id": ask.params.id })
  const userID_in_note = note.userID
  let userID_making_req = ask.body.userID;
  try {
    if (userID_making_req != userID_in_note) {
      give.send('You are not authorized to update this note.');
    } else {
      await NotesModel.findByIdAndUpdate({ "_id": ask.params.id }, ask.body)
      give.send("Your Note has been updated.")
    }
  } catch (error) {
    give.send(`Something went Wrong!\n${error.message}`)
  }
})

noteRouter.delete('/delete/:id', async (ask, give) => {
  const note = await NotesModel.findOne({ "_id": ask.params.id })
  const userID_in_note = note.userID
  let userID_making_req = ask.body.userID;
  try {
    if (userID_making_req != userID_in_note) {
      give.send('You are not authorized to delete this note.');
    } else {
      await NotesModel.findByIdAndDelete({ "_id": ask.params.id });
      give.send("Your Note has been deleted.")
    }
  } catch (error) {
    give.send(`Something went Wrong!\n${error.message}`)
  }
})

module.exports = {
  noteRouter
}