// ** React Imports
import { useEffect, useState, useCallback, useRef } from "react";

// ** Third Party Components
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const EditorControlled = ({setFieldValue}) => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty());
  const [text, setText] = useState("");

  // useEffect(() => {
  //   console.log("value", value);
  // }, [value]);

  const content = convertToRaw(value.getCurrentContent());
  // const text = content.blocks.map((block) => block.text).join("\n");
  const saveText = useDebounce((editorState) => {
    const content = convertToRaw(editorState.getCurrentContent());
    const newText = content.blocks.map((block) => block.text).join("\n");
    console.log("User stopped typing, saving text:", newText);
    setText(newText);
    setFieldValue("Describe",newText)
  }, 1000);

  // console.log("User typed text:", text);

  const handleEditorChange = (newEditorState) => {
    setValue(newEditorState);
    saveText(newEditorState);
   
  };

  return (
    <Card>
      <CardBody>
        <Editor
          editorState={value}
          // onEditorStateChange={(data) => setValue(data)}
          onEditorStateChange={handleEditorChange}
        />
      </CardBody>
    </Card>
  );
};

export default EditorControlled;

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
