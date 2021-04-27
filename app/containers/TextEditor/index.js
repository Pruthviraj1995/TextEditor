/**
 *
 * TextEditor
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import history from 'utils/history';

import { useInjectReducer } from 'utils/injectReducer';
import { TextEditor as TextEditorComponent } from './components/text-editor';
import makeSelectTextEditor from './selectors';
import reducer from './reducer';
import { defaultContent } from './constants';

export function TextEditor() {
  useInjectReducer({ key: 'textEditor', reducer });

  const [editorContent, setEditorContent] = useState(defaultContent);

  const handleEditorChange = value => {
    setEditorContent(value);
  };

  return (
    <div>
      TextEditor
      <button type="button" onClick={() => history.push('/')}>
        Home
      </button>
      <TextEditorComponent
        {...{
          editorContent,
          handleEditorChange,
        }}
      />
    </div>
  );
}

TextEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  textEditor: makeSelectTextEditor(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TextEditor);
