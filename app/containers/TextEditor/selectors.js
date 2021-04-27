import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the textEditor state domain
 */

const selectTextEditorDomain = state => state.textEditor || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TextEditor
 */

const makeSelectTextEditor = () =>
  createSelector(
    selectTextEditorDomain,
    substate => substate,
  );

export default makeSelectTextEditor;
export { selectTextEditorDomain };
