// as import of Java
console.log("Starting App.js!!!\n");
const fs = require('fs');
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

// procces comand line arguments 
let cmnd = process.argv[2];
const argv = yargs.argv;

// console.log("Process: ", process.argv);
// console.log("Command: ", cmnd);
// console.log("Yargs: ", argv);

if (cmnd === 'add') {
    notes.addNote(argv.title, argv.body);
} else if (cmnd === 'list') {
    notes.listNotes();
} else if (cmnd === 'read') {
    notes.readNote(argv.title);
} else if (cmnd === 'remove') {
    notes.removeNote(argv.title||argv.index);
} else if (cmnd === 'update') {
    notes.updateNote(argv.title,
        (argv.newTitle !== "") ? argv.newTitle : null,
        (argv.newBody !== "") ? argv.newBody : null);
} else {
    console.log("Unknown command");

}