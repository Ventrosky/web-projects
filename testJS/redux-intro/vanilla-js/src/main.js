
import store from './store/store';
import { addNote, showAll, showWork, showPersonal} from './actions/actions';

// ------ HTML references ------
let notesUList = document.getElementById('notes');
let addNoteForm = document.getElementById('add-note');
let addNoteTitle = addNoteForm['title'];
let addNoteContent = addNoteForm['content'];
let tagWork = document.getElementById('t1');
let tagPersonal = document.getElementById('t2');
let sWork = document.getElementById('s1');
let sPersonal = document.getElementById('s2');

// ------ Redux ------
function deleteNote(index) {
  store.dispatch(removeNote(index));  
  // console.log(index);
}

function renderNotes() {
    let notes = store.getState().notes;
    let _re = store.getState().visibility;
    console.log(store.getState())
    notesUList.innerHTML = '';
    notes.filter(n => _re.test(n.tag)).map((note, index) => {
      let noteItem = `
        <li>
          <b>${ note.title }</b>
          <button data-id="${ index }">x</button>
          <br />
          <small>${ note.tag }</small>
          <br />
          <span>${ note.content }</span>
        </li>
      `;
      notesUList.innerHTML += noteItem;
    });
    
    setDeleteNoteButtonsEventListeners();
}

store.subscribe(() => {
    renderNotes();
});

// ------ Event Listeners ------
addNoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = addNoteTitle.value;
  let content = addNoteContent.value;
  let tag = tagPersonal.checked ? tagPersonal.value : tagWork.value;
  store.dispatch(addNote(title, content, tag));
  // console.log('Title:', addNoteTitle.value, 'Content:', addNoteContent.value);
});

function setDeleteNoteButtonsEventListeners() {
  let buttons = document.querySelectorAll('ul#notes li button');
  
  for(let button of buttons) {
    button.addEventListener('click', () => {
      deleteNote(button.dataset.id);
    });
  }
}

sWork.addEventListener('click', (e) => {
    if(sPersonal.checked && sWork.checked){
        store.dispatch(showAll());
    } else  if(sWork.checked) {
        store.dispatch(showWork());
    } else  if(sPersonal.checked) {
        store.dispatch(showPersonal());
    } else {
        store.dispatch(showAll());
    }
});
sPersonal.addEventListener('click', (e) => {
    if(sPersonal.checked && sWork.checked){
        store.dispatch(showAll());
    } else  if(sWork.checked) {
        store.dispatch(showWork());
    } else  if(sPersonal.checked) {
        store.dispatch(showPersonal());
    }
});
// ------ Render the initial Notes ------
renderNotes();

/*
console.log('Before:', store.getState());
store.dispatch(addNote('One', 'One content'));
store.dispatch(addNote('Two', 'Two content'));
store.dispatch(addNote('Three', 'Three content'));
console.log('After:', store.getState());  */