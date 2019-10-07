//read existing notes from localStorage
const getSavedNotes = function(){
   
    const notesJSON = localStorage.getItem('notes');
if (notesJSON !== null) {
    return JSON.parse(notesJSON);

} else {
    return [];
}
}
//save the notes to localStorage

const savedNotes = function(notes){
    localStorage.setItem('notes',JSON.stringify(notes));
}

//Remove a note from the list
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id;

    });

    if (noteIndex > -1) {
        notes.splice(noteIndex,1);
    }
}


//Generate the DOM structure for the Note
const generateNoteDOM = function(note) {
    const noteEl = document.createElement("div");
    const textEl = document.createElement('span');
    const button = document.createElement('button');

    //setup the remove note buton

    button.textContent = 'x';
    noteEl.appendChild(button);
    button.addEventListener('click', function() {
        removeNote(note.id);
        savedNotes(notes);
        renderNotes(notes,filters);
    })

    if (note.title.length > 0) {
        noteEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unamed note';
    }

    noteEl.appendChild(textEl);
    return noteEl;
}

// render application note 
const renderNotes = function(notes,filters) {
    const filteredNotes = notes.filter(function(note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });

    document.querySelector("#notes").innerHTML = ' ';

    filteredNotes.forEach(function(note) {

        const noteEtl = generateNoteDOM(note);
        document.querySelector("#notes").appendChild(noteEtl);
    });

};