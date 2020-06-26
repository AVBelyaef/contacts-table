import { all } from 'redux-saga/effects';
import usersSagas from './userSagas';
import contactSagas from './contactSagas';

/**
 *
 * @returns {Generator<<"ALL", <"FORK", ForkEffectDescriptor>>, void, *>}
 */
function* watchFetches() {
  yield all([
    ...usersSagas,
    ...contactSagas,
  ]);
}

export default watchFetches;
