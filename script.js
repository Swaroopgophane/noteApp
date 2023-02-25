const addButton = document.querySelector('.add-note-btn');
const noteContainer = document.querySelector('.note-container');


const updateLSData = () =>{
    const textAreaData = document.querySelectorAll('.textarea');
    const notes = [];

    textAreaData.forEach((curEle) =>{
        return notes.push(curEle.value);
    });


    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note-box');

    const htmlData = `
    <div class="operations-btns">
        <i class="fa-solid fa-pen-to-square edit"></i>
        <i class="fa-solid fa-trash delete"></i>
    </div>
    <div class="text-box">
        <div class="main-text ${text ? '' : 'hidden'}"></div>
        <textarea class="textarea ${text ? 'hidden' : ''}" name="" placeholder="Add Your Note" id="" cols="30" rows="10"></textarea>
    </div>`;

    note.insertAdjacentHTML('afterbegin',htmlData);

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main-text');
    const textArea = note.querySelector('.textarea');


    //delete note

    deleteButton.addEventListener("click",()=>{
        note.remove();
        updateLSData();
    });


    textArea.value = text;
    mainDiv.innerHTML = text;

    //edit note

    editButton.addEventListener("click",() =>{

        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');   
        
    }); 

    textArea.addEventListener("change",(event) =>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    });

    noteContainer.appendChild(note);
}

// getting data from localStorage

const notes = JSON.parse(localStorage.getItem('notes'));


if(notes){
    notes.forEach((curEle) =>{
        addNewNote(curEle);
    })
}



addButton.addEventListener("click", () => {
    addNewNote();
});