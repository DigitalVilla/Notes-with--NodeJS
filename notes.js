const fs = require("fs");
const db = "notesDB.json";
let notes = [];
callAPI("get");

let addNote = (title, body) => {
    notes.push({
        title,
        body
    });
    callAPI("post");
}

let listNotes = () => {
    callAPI("get");
    console.log("\t**My Notes**");
    notes.forEach((n, i) => {
        console.log(`${i+1}. ${n.title}: ${n.body}`);
    })
    console.log();
}

let readNote = (title) => {
    callAPI("get");
    let n = select(notes, (el) => el.title === title)[0];
    console.log(`${n.index}. ${n.title}: ${n.body}\n`);
}

let removeNote = (title) => {


    console.log(typeof title);

    let n = null;
    notes.forEach((el, i) => {
        if (typeof title === "number") {
            if (i === parseInt(title)-1)
                return n = i;
        } else if (el.title === title) {
            return n = i;
        }
    });

    (!n) ? console.log(`Note Not Found...\n`):
        console.log(`Note: ${n+1}. ${notes[n].title} was deleted.`);
    notes.splice(n, 1);
    callAPI("post");
}

let updateNote = (ttl, newTitle, newBody) => {
    let n = null;
    notes.forEach((el, i) => {
        if (el.title === ttl) {
            notes[i] = {
                title: newTitle || el.title,
                body: newBody || el.body
            };
            return n = i;
        }
    });
    (!n) ? console.log(`Note Not Found\n`):
        console.log(`${n+1}. ${notes[n].title}: ${notes[n].body}\n`);
    callAPI("post");
}



function callAPI(method) {
    (method === "get") ?
    notes = JSON.parse(fs.readFileSync(db)):
        fs.writeFileSync(db, JSON.stringify(notes));
}


function select(array, query) {
    let filter = [];
    array.forEach((el, indx) => {
        if (query(el, indx)) {
            filter.push(el);
            filter[filter.length - 1].index = indx + 1;
        }
    });
    return filter;
}


// https://love2dev.com/blog/javascript-remove-from-array/



module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote,
    updateNote
};