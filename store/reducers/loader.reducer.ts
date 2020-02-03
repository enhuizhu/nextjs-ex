import { SHOW_LOADER} from '../actions/loader.actions';

export default (state: any, payload: any) => {
  switch (payload.type) {
    case SHOW_LOADER:
      return true;

    default:
      return false;
  }
}
