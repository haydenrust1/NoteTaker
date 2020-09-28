const fs = require("fs");
const path = require('path');

let noteData = require("../db/db.json");
const { v4 : uuidv4 } = require("uuid");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function(req, res) {
    const newId = uuidv4();
    req.body.id = newId;
    noteData.push(req.body);

    fs.writeFile('./Develop/db/db.json', JSON.stringify(noteData), "utf8", (err) => {
      if (err) throw err;

      res.json(noteData);
    })
    
  });

  app.delete("/api/notes/:id", function(req, res) {
    noteData = noteData.filter(note => {
      if (note.id === req.params.id) {
        return false;
      }
      return true;
    });

    console.log(path.join(__dirname));

    fs.writeFile('./Develop/db/db.json', JSON.stringify(noteData), "utf8", (err) => {

      if (err) throw err;
      res.send('deleted');
    });

  })
}
