import { SHOW_ALL, SHOW_WORK, SHOW_PERSONAL } from '../actions/actions';

function visibilityFilter(visibility = /^.+$/, action) {
  switch(action.type) {
    case SHOW_ALL:
      return /^.+$/;
    case SHOW_WORK:
      return /^work$/;
    case SHOW_PERSONAL:
      return /^personal$/;
    default:
      return visibility;
  };
}

export default visibilityFilter;