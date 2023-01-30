import React, { useState, useRef } from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';

import {
  align,
  blockquote,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  lineHeight,
  link,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
} from 'suneditor/src/plugins';

export default function FormEditor() {
  const [body, setBody] = useState();
  const editor = useRef();

  const handleChange = () => {
    console.log('Change');
  };

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleImageUploadBefore = () => {};

  const handleImageUpload = () => {};

  const handleImageUploadError = () => {};
  return (
    <div>
      <SunEditor
        onChange={handleChange}
        name="editor_form"
        defaultValue={body && body}
        setContents={body}
        placeholder="Enter your content !!!"
        width="100%"
        height="450px"
        getSunEditorInstance={getSunEditorInstance}
        onImageUploadBefore={handleImageUploadBefore}
        onImageUpload={handleImageUpload}
        onImageUploadError={handleImageUploadError}
        setOptions={{
          plugins: [
            align,
            font,
            fontColor,
            blockquote,
            fontSize,
            formatBlock,
            hiliteColor,
            horizontalRule,
            lineHeight,
            list,
            paragraphStyle,
            table,
            template,
            textStyle,
            image,
            link,
          ],
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle'],
            ['blockquote'],
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['fontColor', 'hiliteColor'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image'],
            ['codeView', 'preview', 'print'],
            ['save'],
          ],
          formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          font: [
            'Arial',
            'Open Sans ',
            'Moon Dance',
            'Lato',
            'Quicksand',
            'Roboto',
          ],
        }}
      />
    </div>
  );
}
