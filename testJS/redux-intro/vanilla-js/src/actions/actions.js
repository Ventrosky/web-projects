export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_WORK = 'SHOW_WORK';
export const SHOW_PERSONAL = 'SHOW_PERSONAL';

export function addNote(title, content, tag){
    return { type: ADD_NOTE, title, content, tag};
}

export function removeNote(id) {
  return { type: REMOVE_NOTE, id: id };
}

export function showAll() {
  return { type: SHOW_ALL};
}

export function showWork() {
  return { type: SHOW_WORK };
}

export function showPersonal() {
  return { type: SHOW_PERSONAL};
}