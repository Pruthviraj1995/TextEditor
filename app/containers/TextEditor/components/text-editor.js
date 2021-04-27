/*
 TinyMCE Editor:  https://www.tiny.cloud/docs/

 ReactIntegration Controlled Components: https://www.tiny.cloud/docs/integrations/react/#usingthetinymcereactcomponentasacontrolledcomponent

 */

import React, { memo } from 'react';
import { func, string, array, bool } from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

export const TextEditor = memo(
  ({
    handleEditorChange,
    editorContent,
    toolbarOptions,
    contextMenuOptions,
    isDisabled,
  }) => (
    // 1. It behaves like a onChange Function & gives the content, editor info from the Text Editor
    // 2. The function for required checkbox whether it is selected in all the checkbox
    // const handleEditorChange = (content, editor) => {
    //   const requiredBoxes = editor.dom.select('input')
    //   const isRequiredBoxesChecked = requiredBoxes
    //     .filter(tc => tc.className === 'gdpr-tc-required')
    //     .map(box => box.checked)
    //     .every(checkbox => checkbox === true)

    //   return isRequiredBoxesChecked
    // }

    <Editor
      initialValue={editorContent}
      disabled={isDisabled}
      init={{
        menubar: false,
        statusbar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'autoresize',
        ],
        toolbar: toolbarOptions.join(' '),
        placeholder: 'Please use this space to write out your text.',
        block_formats: 'Normal=p; Header 1=h1; Header 2=h2; Header 3=h3',

        // Custom CheckBox Options. ToolbarName: knockriCustomCheckBox
        setup(editor) {
          function requiredCheckBox() {
            return `<input type="checkbox" class="gdpr-tc-required" />  <span style="color:red;">*</span>&nbsp;`;
          }
          function optionalCheckBox() {
            return `<input type="checkbox" class="gdpr-tc-not-required"/> `;
          }

          editor.ui.registry.addMenuButton('knockriCustomCheckBox', {
            icon: 'unselected',
            fetch(callback) {
              const items = [
                {
                  type: 'menuitem',
                  icon: 'unselected',
                  text: '*Required',
                  format: 'required',
                  onAction() {
                    editor.insertContent(requiredCheckBox());
                  },
                },
                {
                  type: 'menuitem',
                  icon: 'unselected',
                  text: 'Optional',
                  onAction() {
                    editor.insertContent(optionalCheckBox());
                  },
                },
              ];
              callback(items);
            },
          });
        },
        contextmenu: contextMenuOptions,
      }}
      onEditorChange={handleEditorChange}
    />
  ),
);

TextEditor.propTypes = {
  handleEditorChange: func,
  editorContent: string,
  toolbarOptions: array,
  contextMenuOptions: string,
  isDisabled: bool,
};

TextEditor.defaultProps = {
  editorContent: '',
  toolbarOptions: [
    'formatselect',
    'bold',
    'italic',
    'underline',
    'link',
    'bullist',
    'numlist',
    'removeformat',
    'knockriCustomCheckBox',
  ],
  // RightClick on Editor Options
  contextMenuOptions: 'cut copy paste selectall link',
};
