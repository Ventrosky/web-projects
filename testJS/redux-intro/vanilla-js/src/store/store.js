import { createStore } from 'redux';
import reducers from '../reducers/reducers';

let initialState = {
  notes: [
    { title: 'You are awesome', content: 'No, wait, I meant legendary!', tag: 'work'},
    { title: 'Ooops', content: 'I was talking to myself' , tag: 'personal'}
  ],
  visibility: /^.+$/
};

export default createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);