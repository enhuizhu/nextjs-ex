import store from '../../store/store';
import { showLoader, hideLoader } from '../../store/actions/loader.actions';

describe('test store', () => {
  it('test initial state', () => {
    const state = store.getState();
    expect(state.showLoader).toBe(false);
  });

  it('change loader state', () => {
    store.dispatch(showLoader());
    let state = store.getState();
    expect(state.showLoader).toBe(true);
    store.dispatch(hideLoader());
    state = store.getState();
    expect(state.showLoader).toBe(false);
  });
});
