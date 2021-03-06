import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/terminal';
import 'brace/mode/javascript';
//direct child of Prompt

const Challenge = ({solution, solve}) => (
  <AceEditor
    mode="javascript"
    theme="terminal"
    name="Editor"
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    editorProps={{
      $blockScrolling: true
    }}
    setOptions={{
      tabSize: 2
    }}
    onChange={(e) => solve(e)}
    value={solution}
    height="100%"
    width="100%"
  />
)

export default Challenge;
